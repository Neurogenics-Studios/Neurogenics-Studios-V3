import { CSSProperties } from 'react';

export interface LiquidEtherProps {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  resolution?: number;
  dt?: number;
  BFECC?: boolean;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  className?: string;
  style?: CSSProperties;
}

export default function LiquidEther(props: LiquidEtherProps): JSX.Element;
