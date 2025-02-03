import { Letter, Boundary, CursorPosition } from '../types/Letter';

const GRAVITY = 20;
const DAMPING = 0.85;
const AIR_RESISTANCE = 0.995;
const CURSOR_RADIUS = 100; // Radius of cursor influence
const REPULSION_FORCE = 1000; // Strength of repulsion

export function updatePhysics(
  letter: Letter, 
  boundaries: Boundary[], 
  deltaTime: number,
  cursor: CursorPosition
): void {
  // Apply cursor repulsion
  applyCursorRepulsion(letter, cursor);
  
  // Apply gravity
  letter.vy += GRAVITY * deltaTime;
  
  // Apply air resistance
  letter.vx *= AIR_RESISTANCE;
  letter.vy *= AIR_RESISTANCE;
  
  // Update position with increased velocity
  letter.x += letter.vx * deltaTime * 1.5;
  letter.y += letter.vy * deltaTime * 1.5;
  
  // Update rotation
  letter.rotation += letter.angularVelocity * deltaTime * 1.5;
  
  // Handle boundary collisions
  handleBoundaryCollisions(letter, boundaries);
}

function applyCursorRepulsion(letter: Letter, cursor: CursorPosition): void {
  // Calculate distance between letter center and cursor
  const letterCenterX = letter.x + letter.width / 2;
  const letterCenterY = letter.y + letter.height / 2;
  
  const dx = letterCenterX - cursor.x;
  const dy = letterCenterY - cursor.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Apply repulsion if within cursor radius
  if (distance < CURSOR_RADIUS) {
    // Calculate repulsion strength (stronger when closer)
    const force = (1 - distance / CURSOR_RADIUS) * REPULSION_FORCE;
    
    // Normalize direction and apply force
    const angle = Math.atan2(dy, dx);
    letter.vx += Math.cos(angle) * force;
    letter.vy += Math.sin(angle) * force;
    
    // Add some spin based on relative position to cursor
    letter.angularVelocity += (dx * letter.vy - dy * letter.vx) * 0.0001;
  }
}

function handleBoundaryCollisions(letter: Letter, boundaries: Boundary[]): void {
  // Ground collision
  if (letter.y + letter.height > window.innerHeight) {
    letter.y = window.innerHeight - letter.height;
    letter.vy = -letter.vy * DAMPING;
    letter.angularVelocity *= DAMPING;
  }
  
  // Wall collisions
  if (letter.x < 0) {
    letter.x = 0;
    letter.vx = -letter.vx * DAMPING;
  } else if (letter.x + letter.width > window.innerWidth) {
    letter.x = window.innerWidth - letter.width;
    letter.vx = -letter.vx * DAMPING;
  }
}
