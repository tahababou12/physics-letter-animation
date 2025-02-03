import './style.css';
import { Letter, CursorPosition } from './types/Letter';
import { updatePhysics } from './utils/physics';
import { generateLetter } from './utils/letterGenerator';

class LetterAnimation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private letters: Letter[] = [];
  private lastTime: number = 0;
  private spawnInterval: number = 100;
  private lastSpawn: number = 0;
  private cursor: CursorPosition = { x: 0, y: 0 };
  private cursorRadius: number = 100;

  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    
    window.addEventListener('resize', () => this.resizeCanvas());
    this.setupCursorTracking();
    this.animate(0);
  }

  private setupCursorTracking(): void {
    window.addEventListener('mousemove', (e) => {
      this.cursor.x = e.clientX;
      this.cursor.y = e.clientY;
    });

    // Touch support
    window.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.cursor.x = e.touches[0].clientX;
      this.cursor.y = e.touches[0].clientY;
    }, { passive: false });
  }

  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private update(deltaTime: number): void {
    // Spawn new letters
    const currentTime = performance.now();
    if (currentTime - this.lastSpawn > this.spawnInterval) {
      this.letters.push(generateLetter());
      this.lastSpawn = currentTime;
    }

    // Update physics for each letter
    this.letters.forEach(letter => {
      updatePhysics(letter, [], deltaTime / 1000, this.cursor);
    });

    // Remove letters that are off screen
    this.letters = this.letters.filter(
      letter => letter.y < window.innerHeight + letter.size
    );
  }

  private render(): void {
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw cursor influence area
    this.ctx.beginPath();
    this.ctx.arc(this.cursor.x, this.cursor.y, this.cursorRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.fill();

    this.letters.forEach(letter => {
      this.ctx.save();
      this.ctx.translate(letter.x + letter.width / 2, letter.y + letter.height / 2);
      this.ctx.rotate(letter.rotation);
      
      // Add shadow for depth
      this.ctx.shadowColor = letter.color;
      this.ctx.shadowBlur = 10;
      
      this.ctx.font = `bold ${letter.size}px Arial`;
      this.ctx.fillStyle = letter.color;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(letter.char, 0, 0);
      
      this.ctx.restore();
    });
  }

  private animate(currentTime: number): void {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame((time) => this.animate(time));
  }
}

// Start the animation
new LetterAnimation();
