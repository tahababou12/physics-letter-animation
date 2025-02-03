export interface Letter {
  char: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  angularVelocity: number;
  density: number;
  width: number;
  height: number;
  color: string;
}

export interface CursorPosition {
  x: number;
  y: number;
}
