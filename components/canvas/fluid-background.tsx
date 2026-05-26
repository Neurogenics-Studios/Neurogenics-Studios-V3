"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.999, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

// Classic 3D Perlin noise — GPU only, no CPU cost
vec3 mod289v3(vec3 x){ return x - floor(x*(1./289.))*289.; }
vec4 mod289v4(vec4 x){ return x - floor(x*(1./289.))*289.; }
vec4 permute(vec4 x){ return mod289v4(((x*34.)+1.)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.7928429 - 0.8537347*r; }
vec3 fade(vec3 t){ return t*t*t*(t*(t*6.-15.)+10.); }

float cnoise(vec3 P){
  vec3 Pi0=floor(P), Pi1=Pi0+1.;
  Pi0=mod289v3(Pi0); Pi1=mod289v3(Pi1);
  vec3 Pf0=fract(P), Pf1=Pf0-1.;
  vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);
  vec4 iy=vec4(Pi0.yy,Pi1.yy);
  vec4 iz0=vec4(Pi0.z), iz1=vec4(Pi1.z);
  vec4 ixy=permute(permute(ix)+iy);
  vec4 ixy0=permute(ixy+iz0), ixy1=permute(ixy+iz1);
  vec4 gx0=ixy0/7., gy0=fract(floor(gx0)/7.)-.5; gx0=fract(gx0);
  vec4 gz0=vec4(.5)-abs(gx0)-abs(gy0);
  vec4 sz0=step(gz0,vec4(0.)); gx0-=sz0*(step(0.,gx0)-.5); gy0-=sz0*(step(0.,gy0)-.5);
  vec4 gx1=ixy1/7., gy1=fract(floor(gx1)/7.)-.5; gx1=fract(gx1);
  vec4 gz1=vec4(.5)-abs(gx1)-abs(gy1);
  vec4 sz1=step(gz1,vec4(0.)); gx1-=sz1*(step(0.,gx1)-.5); gy1-=sz1*(step(0.,gy1)-.5);
  vec3 g000=vec3(gx0.x,gy0.x,gz0.x),g100=vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010=vec3(gx0.z,gy0.z,gz0.z),g110=vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001=vec3(gx1.x,gy1.x,gz1.x),g101=vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011=vec3(gx1.z,gy1.z,gz1.z),g111=vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000*=norm0.x; g010*=norm0.y; g100*=norm0.z; g110*=norm0.w;
  vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001*=norm1.x; g011*=norm1.y; g101*=norm1.z; g111*=norm1.w;
  float n000=dot(g000,Pf0), n100=dot(g100,vec3(Pf1.x,Pf0.y,Pf0.z));
  float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z)), n110=dot(g110,vec3(Pf1.x,Pf1.y,Pf0.z));
  float n001=dot(g001,vec3(Pf0.x,Pf0.y,Pf1.z)), n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011=dot(g011,vec3(Pf0.x,Pf1.y,Pf1.z)), n111=dot(g111,Pf1);
  vec3 fade_xyz=fade(Pf0);
  vec4 nz=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 nyz=mix(nz.xy,nz.zw,fade_xyz.y);
  return 2.2*mix(nyz.x,nyz.y,fade_xyz.x);
}

void main(){
  // UV with aspect correction
  vec2 uv = vUv;

  // Distance from mouse (0–1 space)
  float dist = distance(uv, uMouse);
  float mouseInfluence = smoothstep(0.45, 0.0, dist);

  float t = uTime;

  // Layered fluid noise — low frequency for cinematic density
  float n1 = cnoise(vec3(uv * 2.0, t * 0.12));
  float n2 = cnoise(vec3(uv * 1.4 + n1 * 0.3, t * 0.08 + mouseInfluence));
  float n3 = cnoise(vec3(uv * 3.0 + n2 * 0.2, t * 0.18));

  float fluid = n2 * 0.5 + 0.5;
  float detail = n3 * 0.5 + 0.5;

  // Brand palette: Cyan + Violet + Indigo
  vec3 base    = vec3(0.01, 0.004, 0.022);   // Near-black base
  vec3 cyan    = vec3(0.0,  0.72,  0.88);    // #00b8e0
  vec3 violet  = vec3(0.42, 0.08,  0.82);    // #6a14d1
  vec3 indigo  = vec3(0.22, 0.14,  0.72);    // #3824b7

  vec3 fluidColor = mix(cyan, violet, fluid);
  fluidColor = mix(fluidColor, indigo, detail * 0.4);
  fluidColor *= 0.28; // Keep it dark/subtle

  vec3 color = base + fluidColor;

  // Mouse interaction: brighter trail near cursor
  color += cyan  * mouseInfluence * 0.18;
  color += violet * pow(mouseInfluence, 2.5) * 0.25;

  // Subtle edge vignette to focus on center
  float v = uv.x * uv.y * (1. - uv.x) * (1. - uv.y);
  float vignette = clamp(pow(22.0 * v, 0.3), 0.0, 1.0);
  color *= vignette * 0.5 + 0.5;

  gl_FragColor = vec4(color, 1.0);
}
`;

export function FluidBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    uTime:       { value: 0.0 },
    uMouse:      { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), []); // eslint-disable-line react-hooks/exhaustive-deps

  const mouseTarget = useMemo(() => new THREE.Vector2(0.5, 0.5), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = state.clock.elapsedTime;

    // Pointer in NDC -1..1, convert to 0..1 UV space
    const px = (state.pointer.x + 1) / 2;
    const py = (state.pointer.y + 1) / 2;
    mouseTarget.set(px, py);

    // Slow lerp for silky trail
    mat.uniforms.uMouse.value.lerp(mouseTarget, 0.04);
    mat.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    // Full-screen quad rendered at far-clip depth (gl_Position z=0.999)
    // so it is always behind the 3D scene
    <mesh ref={meshRef} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
