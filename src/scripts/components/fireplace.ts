interface Spark {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  totalFrames: number;
}

const FRAMES = Object.freeze(
  Array(25)
    .fill(0)
    .map((_, i) => ({ x: i * 128, y: 0 })),
);

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const DIST_PER_FLAME = 30;
const TOTAL_FLAMES = Math.ceil(CANVAS_WIDTH / DIST_PER_FLAME);

const MAX_FPS = 60;
const MILLIS_PER_FRAME = 1000 / MAX_FPS;
const FRAME_TO_UPDATE = 2;

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const flames = Array(TOTAL_FLAMES)
  .fill(0)
  .map((_, i) => ({
    x: -50 + DIST_PER_FLAME * i,
    y: CANVAS_HEIGHT - 110,
    frame: getRandomInt(0, FRAMES.length),
  }));

const sparks: Spark[] = [];
const NEW_SPARKS_PER_FRAME = 5;

class Fireplace extends HTMLElement {
  private canvas!: HTMLCanvasElement;
  private lastUpdateTime: number = 0;
  private image!: HTMLImageElement;
  private currentFrame: number = 0;

  private get context() {
    return this.canvas.getContext('2d')!;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    this.canvas = document.createElement('canvas');
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    shadow.appendChild(this.canvas);

    this.image = new Image();
    this.image.src = '/fire-sheet.png';

    this.image.addEventListener('load', () => {
      requestAnimationFrame((time) => this._render(time));
    });
  }

  private _render(time: number) {
    while (time - this.lastUpdateTime >= MILLIS_PER_FRAME) {
      this.lastUpdateTime = time;

      this.currentFrame = (this.currentFrame + 1) % FRAME_TO_UPDATE;
      if (this.currentFrame !== 1) continue;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.globalAlpha = 1;
      this._renderFlames();
      this._generateNewSparks();
      this._renderSparks();
    }

    requestAnimationFrame((time) => this._render(time));
  }

  private _renderFlames() {
    flames.forEach((flame) => {
      this.context.drawImage(
        this.image,
        FRAMES[flame.frame].x,
        FRAMES[flame.frame].y,
        128,
        128,
        flame.x,
        flame.y,
        128,
        128,
      );

      flame.frame = (flame.frame + 1) % FRAMES.length;
    });
  }

  private _generateNewSparks() {
    for (let i = 0; i < NEW_SPARKS_PER_FRAME; i++) {
      sparks.push({
        x: getRandomInt(0, CANVAS_WIDTH),
        y: CANVAS_HEIGHT - 20,
        radius: getRandomInt(2, 5),
        vx: getRandomInt(-3, 3),
        vy: getRandomInt(-3, 0),
        totalFrames: getRandomInt(50, 70),
      });
    }
  }

  private _renderSparks() {
    for (let i = 0; i < sparks.length; i++) {
      const spark = sparks[i];

      this.context.beginPath();
      this.context.arc(spark.x, spark.y, spark.radius, 0, 2 * Math.PI);
      this.context.globalAlpha =
        spark.totalFrames < 10 ? spark.totalFrames / 10 : 1;
      this.context.fillStyle = '#d1632e';
      this.context.fill();

      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.totalFrames--;
      if (spark.totalFrames === 0) {
        sparks.splice(i, 1);
        i--;
      }
    }
  }
}

export default Fireplace;
