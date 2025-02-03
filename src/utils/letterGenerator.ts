import { Letter } from '../types/Letter';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MIN_SIZE = 20;
const MAX_SIZE = 60;

const COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Turquoise
  '#45B7D1', // Blue
  '#96CEB4', // Mint
  '#FFEEAD', // Yellow
  '#D4A5A5', // Pink
  '#9B59B6', // Purple
  '#3498DB', // Blue
  '#E74C3C', // Red
  '#2ECC71', // Green
  '#F1C40F', // Yellow
  '#E67E22'  // Orange
];

export function generateLetter(): Letter {
  const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  
  return {
    char,
    x: Math.random() * (window.innerWidth - size),
    y: -size,
    vx: (Math.random() - 0.5) * 400, // Increased from 200
    vy: Math.random() * 100, // Added initial downward velocity
    size,
    rotation: Math.random() * Math.PI * 2,
    angularVelocity: (Math.random() - 0.5) * 4, // Increased rotation speed
    density: 1.0,
    width: size,
    height: size,
    color // Added color property
  };
}
