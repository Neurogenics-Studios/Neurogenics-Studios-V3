// "use client";

// import { useRef, useMemo, useEffect } from "react";
// import { useFrame } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";

// // Creates a CanvasTexture with fake code lines on the screen
// function useScreenTexture() {
//   return useMemo(() => {
//     if (typeof document === "undefined") return null;
//     const canvas = document.createElement("canvas");
//     canvas.width = 1024;
//     canvas.height = 640;
//     const ctx = canvas.getContext("2d")!;

//     // Dark background
//     ctx.fillStyle = "#0a0a12";
//     ctx.fillRect(0, 0, 1024, 640);

//     // Top bar
//     ctx.fillStyle = "#14141e";
//     ctx.fillRect(0, 0, 1024, 32);

//     // Traffic lights
//     const lights = ["#ff5f57", "#febc2e", "#28c840"];
//     lights.forEach((c, i) => {
//       ctx.beginPath();
//       ctx.arc(20 + i * 22, 16, 6, 0, Math.PI * 2);
//       ctx.fillStyle = c;
//       ctx.fill();
//     });

//     // Tab indicator
//     ctx.fillStyle = "#1e1e2e";
//     ctx.fillRect(100, 4, 140, 24);
//     ctx.fillStyle = "#6366f1";
//     ctx.fillRect(100, 28, 140, 2);

//     // Line numbers + code
//     const codeColors = ["#6366f1", "#22d3ee", "#a78bfa", "#34d399", "#f472b6", "#e2e8f0", "#fbbf24"];
//     const lines = [
//       { indent: 0, color: 0, width: 180 },
//       { indent: 1, color: 1, width: 240 },
//       { indent: 2, color: 2, width: 160 },
//       { indent: 2, color: 3, width: 280 },
//       { indent: 2, color: 5, width: 200 },
//       { indent: 3, color: 1, width: 220 },
//       { indent: 3, color: 4, width: 150 },
//       { indent: 2, color: 5, width: 60 },
//       { indent: 1, color: 5, width: 40 },
//       { indent: 0, color: 5, width: 20 },
//       { indent: 0, color: 0, width: 0 },
//       { indent: 0, color: 0, width: 200 },
//       { indent: 1, color: 6, width: 300 },
//       { indent: 2, color: 1, width: 260 },
//       { indent: 2, color: 3, width: 180 },
//       { indent: 2, color: 2, width: 320 },
//       { indent: 3, color: 4, width: 140 },
//       { indent: 3, color: 1, width: 250 },
//       { indent: 2, color: 5, width: 60 },
//       { indent: 1, color: 5, width: 40 },
//       { indent: 0, color: 5, width: 20 },
//       { indent: 0, color: 0, width: 0 },
//       { indent: 0, color: 3, width: 260 },
//       { indent: 1, color: 5, width: 180 },
//     ];

//     const lineH = 22;
//     const startY = 48;

//     lines.forEach((line, i) => {
//       const y = startY + i * lineH;
//       // Line number
//       ctx.fillStyle = "#3a3a5c";
//       ctx.font = "13px monospace";
//       ctx.fillText(String(i + 1).padStart(3, " "), 12, y + 14);

//       if (line.width > 0) {
//         // Code block
//         ctx.fillStyle = codeColors[line.color];
//         ctx.globalAlpha = 0.8;
//         const x = 50 + line.indent * 24;
//         ctx.beginPath();
//         if (ctx.roundRect) {
//           ctx.roundRect(x, y + 4, line.width, 12, 3);
//         } else {
//           ctx.rect(x, y + 4, line.width, 12);
//         }
//         ctx.fill();
//         ctx.globalAlpha = 1;
//       }
//     });

//     // Cursor blink line
//     ctx.fillStyle = "#6366f1";
//     ctx.fillRect(50, startY + 12 * lineH + 4, 2, 14);

//     // Sidebar file explorer
//     ctx.fillStyle = "#0e0e1a";
//     ctx.fillRect(1024 - 180, 32, 180, 608);
//     ctx.fillStyle = "#1a1a2e";
//     ctx.fillRect(1024 - 180, 32, 180, 1);

//     // File entries
//     for (let i = 0; i < 8; i++) {
//       const fy = 50 + i * 28;
//       ctx.fillStyle = i === 2 ? "rgba(99, 102, 241, 0.15)" : "transparent";
//       ctx.fillRect(1024 - 176, fy, 172, 24);
//       ctx.fillStyle = i === 2 ? "#a78bfa" : "#4a4a6a";
//       ctx.beginPath();
//       const rectWidth = 60 + Math.random() * 80;
//       if (ctx.roundRect) {
//         ctx.roundRect(1024 - 160, fy + 6, rectWidth, 10, 3);
//       } else {
//         ctx.rect(1024 - 160, fy + 6, rectWidth, 10);
//       }
//       ctx.fill();
//     }

//     const tex = new THREE.CanvasTexture(canvas);
//     tex.minFilter = THREE.LinearFilter;
//     tex.magFilter = THREE.LinearFilter;
//     return tex;
//   }, []);
// }

// export function Laptop(props: any) {
//   const group = useRef<THREE.Group>(null);
//   const screenTex = useScreenTexture();
//   const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf");

//   // Traverse the glTF scene to apply our custom screen texture and premium materials
//   useEffect(() => {
//     if (!scene || !screenTex) return;
    
//     // Rotate the texture to match the UV mapping of this specific glTF model
//     screenTex.flipY = false;
//     screenTex.rotation = Math.PI / 2;
//     screenTex.center.set(0.5, 0.5);

//     scene.traverse((child: any) => {
//       if (child.isMesh) {
//         const matName = child.material?.name?.toLowerCase() || "";
//         const nodeName = child.name.toLowerCase();

//         // Screen
//         if (nodeName.includes("screen") || matName.includes("screen")) {
//           child.material = new THREE.MeshStandardMaterial({
//             map: screenTex,
//             emissive: "#ffffff",
//             emissiveMap: screenTex,
//             emissiveIntensity: 0.9,
//             roughness: 0.1,
//             metalness: 0.1,
//           });
//         } 
//         // Aluminum Body
//         else if (matName.includes("body") || matName.includes("aluminum") || matName.includes("mac")) {
//           child.material = new THREE.MeshStandardMaterial({
//             color: "#8a8d91", // Space gray / silver
//             roughness: 0.25,
//             metalness: 0.85,
//             envMapIntensity: 1.5, // High reflection from environment
//           });
//         }
//         // Keyboard & trackpad
//         else if (matName.includes("keyboard") || matName.includes("keys") || nodeName.includes("keyboard")) {
//           child.material = new THREE.MeshStandardMaterial({
//             color: "#111111",
//             roughness: 0.6,
//             metalness: 0.2,
//           });
//         }
//       }
//     });
//   }, [scene, screenTex]);

//   // Gentle floating and premium elegant rotation
//   useFrame((state) => {
//     if (!group.current) return;
//     const t = state.clock.elapsedTime;
    
//     // Premium smooth hovering
//     group.current.position.y = Math.sin(t * 0.8) * 0.06 - 0.5; // Added offset to center
    
//     // Show off the 3D depth, aluminum body, and screen glare
//     group.current.rotation.y = Math.sin(t * 0.4) * 0.15 + (props.rotationY || -0.2);
//     group.current.rotation.x = Math.sin(t * 0.2) * 0.05 + 0.15;
//     group.current.rotation.z = Math.sin(t * 0.3) * 0.03;
//   });

//   return (
//     <group ref={group} {...props} dispose={null}>
//       <primitive object={scene} />
      
//       {/* Fallback ambient light from screen if needed */}
//       <pointLight position={[0, 1.5, -0.5]} intensity={0.5} color="#6366f1" distance={5} />
//     </group>
//   );
// }

// useGLTF.preload("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf");


"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Creates a premium MacBook Pro screen texture with realistic code
function useScreenTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1280;
    const ctx = canvas.getContext("2d")!;

    // Ultra dark theme background (macOS aesthetic)
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, 2048, 1280);

    // Top menu bar with glassmorphism effect
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, 2048, 48);

    // Traffic lights (red, yellow, green) - perfectly positioned
    const lights = [
      { color: "#ff5f56", x: 24 },
      { color: "#ffbd2e", x: 60 },
      { color: "#27c93f", x: 96 }
    ];
    
    lights.forEach(light => {
      ctx.beginPath();
      ctx.arc(light.x, 24, 7, 0, Math.PI * 2);
      ctx.fillStyle = light.color;
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Window title
    ctx.fillStyle = "#999999";
    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI'";
    ctx.textAlign = "center";
    ctx.fillText("project.ts — Neurogenics Studios", 1024, 29);

    // Tab bar
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 48, 2048, 36);
    
    // Active tab
    ctx.fillStyle = "#2a2a2a";
    ctx.beginPath();
    ctx.roundRect(140, 58, 280, 24, 8);
    ctx.fill();
    
    ctx.fillStyle = "#00d4ff";
    ctx.fillRect(140, 82, 280, 2);
    
    ctx.fillStyle = "#e0e0e0";
    ctx.font = "13px monospace";
    ctx.textAlign = "left";
    ctx.fillText("● project.ts", 160, 74);

    // Inactive tabs
    ["components.tsx", "utils.ts", "config.js"].forEach((tab, i) => {
      ctx.fillStyle = "#666666";
      ctx.fillText(tab, 440 + i * 300, 74);
    });

    // Code editor area with premium syntax highlighting
    const codeLines = [
      { indent: 0, text: "export const renderHeavens = () => {", color: "#6366f1" },
      { indent: 1, text: "return (", color: "#ffffff" },
      { indent: 2, text: "<MacBookPro>", color: "#22d3ee" },
      { indent: 3, text: "quality={9999}", color: "#a78bfa" },
      { indent: 3, text: "shimmer={true}", color: "#34d399" },
      { indent: 3, text: "godLevel={true}", color: "#f472b6" },
      { indent: 3, text: "perfection={Infinity}", color: "#fbbf24" },
      { indent: 3, text: "realMacBook={true}", color: "#06b6d4" },
      { indent: 2, text: "/>", color: "#22d3ee" },
      { indent: 1, text: ")", color: "#ffffff" },
      { indent: 0, text: "}", color: "#6366f1" },
      { indent: 0, text: "", color: "#ffffff" },
      { indent: 0, text: "// Optimized with pristine aluminum finish", color: "#4a7c59" },
      { indent: 0, text: "// Retina display at maximum brightness", color: "#4a7c59" },
      { indent: 0, text: "// M-series chip rendering at light speed", color: "#4a7c59" },
      { indent: 0, text: "const perfection = renderHeavens();", color: "#ffffff" },
    ];

    const lineH = 38;
    const startY = 120;
    const lineNumberWidth = 60;

    ctx.font = "14px monospace";
    ctx.textAlign = "right";

    codeLines.forEach((line, i) => {
      const y = startY + i * lineH;
      
      // Line number
      ctx.fillStyle = "#555555";
      ctx.fillText(String(i + 1).padStart(3, " "), lineNumberWidth - 10, y + 14);

      // Code text
      ctx.fillStyle = line.color;
      ctx.textAlign = "left";
      ctx.font = "14px 'Monaco', 'Menlo', monospace";
      ctx.fillText(
        " ".repeat(line.indent * 2) + line.text,
        lineNumberWidth + 20,
        y + 14
      );
    });

    // Cursor blinking indicator
    ctx.fillStyle = "#6366f1";
    ctx.fillRect(lineNumberWidth + 340, startY + 15 * lineH - 4, 2, 18);

    // Right sidebar - File explorer
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(1800, 84, 248, 1196);
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(1800, 84, 248, 1);

    ctx.fillStyle = "#6366f1";
    ctx.font = "bold 12px monospace";
    ctx.fillText("PROJECT EXPLORER", 1820, 110);

    // File tree with icons
    const files = [
      "📁 app",
      "  📄 page.tsx",
      "  📄 layout.tsx",
      "📁 components",
      "  📁 canvas",
      "    📄 laptop.tsx",
      "    📄 scene.tsx",
      "  📁 sections",
      "📁 public",
      "📄 package.json"
    ];

    ctx.fillStyle = "#aaaaaa";
    ctx.font = "12px monospace";
    files.forEach((file, i) => {
      ctx.fillText(file, 1820, 140 + i * 24);
    });

    // Status bar at bottom
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 1240, 2048, 40);
    
    ctx.fillStyle = "#888888";
    ctx.font = "11px monospace";
    ctx.textAlign = "left";
    ctx.fillText("Ln 16, Col 24", 20, 1263);
    ctx.textAlign = "right";
    ctx.fillText("UTF-8  CRLF  TypeScript JSX  100%", 2028, 1263);

    // Anti-aliasing for crisp display
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 16;
    return tex;
  }, []);
}

// Self-hosted: pmndrs Supabase CDN is offline (see pmndrs/Governance#1)
const MODEL_URL = "/models/macbook-transformed.glb";
const SCREEN_MESH = "Object_123";
const DARK_PARTS = new Set([
  "Object_10", "Object_12", "Object_13", "Object_21", "Object_33", "Object_34",
  "Object_35", "Object_36", "Object_37", "Object_42", "Object_52", "Object_58",
  "Object_76", "Object_80", "Object_84", "Object_125",
]);

export function Laptop(props: any) {
  const { rotationY = -0.15 } = props;
  const group = useRef<THREE.Group>(null);
  const screenTex = useScreenTexture();
  const { scene } = useGLTF(MODEL_URL);
  const model = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    if (!model || !screenTex) return;

    model.traverse((child: any) => {
      if (child.isMesh) {
        const matName = child.material?.name?.toLowerCase() || "";
        const nodeName = child.name.toLowerCase();

        // Premium retina display screen
        if (
          child.name === SCREEN_MESH ||
          nodeName.includes("screen") ||
          matName.includes("screen") ||
          matName.includes("display")
        ) {
          child.material = new THREE.MeshStandardMaterial({
            map: screenTex,
            emissive: "#ffffff",
            emissiveMap: screenTex,
            emissiveIntensity: 1.2,
            roughness: 0.05,
            metalness: 0.15,
            toneMapped: true,
          });
          child.material.envMapIntensity = 1.0;
        }
        // Machined aluminum unibody - Space Gray perfection
        else if (
          DARK_PARTS.has(child.name) ||
          matName.includes("keyboard") ||
          matName.includes("keys") ||
          matName.includes("key") ||
          matName.includes("trackpad") ||
          matName.includes("touchpad") ||
          nodeName.includes("keyboard") ||
          nodeName.includes("trackpad")
        ) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#1a1a1a"),
            roughness: 0.55,
            metalness: 0.35,
            envMapIntensity: 1.2,
          });
        }
        // Bezels and details
        else if (matName.includes("bezel") || matName.includes("edge")) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#2a2a2f"),
            roughness: 0.2,
            metalness: 0.85,
          });
        }
        // Machined aluminum unibody - Space Gray (remaining shell meshes)
        else {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#3a3a3f"),
            roughness: 0.18,
            metalness: 0.92,
            envMapIntensity: 2.0,
          });
        }

        // Enable shadows for photorealism
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [model, screenTex]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    
    group.current.position.y = Math.sin(t * 0.6) * 0.08 - 0.2;

    group.current.rotation.y = Math.sin(t * 0.35) * 0.32 + rotationY;
    group.current.rotation.x = Math.sin(t * 0.2) * 0.14 + 0.12;
    group.current.rotation.z = Math.sin(t * 0.28) * 0.08;
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={model} />
      
      {/* Premium multi-point lighting setup */}
      <pointLight 
        position={[3, 2, 2]} 
        intensity={1.2} 
        color="#ffffff" 
        distance={10}
        castShadow
      />
      <pointLight 
        position={[-2, 1.5, -3]} 
        intensity={0.8} 
        color="#6366f1" 
        distance={8}
      />
      <pointLight 
        position={[0, 3, 0]} 
        intensity={0.6} 
        color="#22d3ee" 
        distance={12}
      />
      
      {/* Screen glow from display */}
      <pointLight 
        position={[0, 0.2, -0.5]} 
        intensity={1.5} 
        color="#6366f1" 
        distance={6}
      />
    </group>
  );
}

useGLTF.preload(MODEL_URL);