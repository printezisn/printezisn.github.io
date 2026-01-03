interface Particle {
  scale: number;
  x: number;
  y: number;
  velocity: number;
  directionInRadians: number;
}

interface State {
  sprite: ImageBitmap;
  particles: Particle[];
  timeElapsedSinceLastFrame: number;
  timeElapsedSinceLastCreation: number;
}

export interface RendererConfig {
  canvas: HTMLCanvasElement;
  canvasWidth: number;
  canvasHeight: number;
  signal?: AbortSignal;
  particlesPerSec: number;
}

const MAX_ELAPSED_TIME = 1000;

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createParticles = (config: RendererConfig, state: State) => {
  const particlesPerMilli = config.particlesPerSec / 1000;

  state.timeElapsedSinceLastCreation += state.timeElapsedSinceLastFrame;
  const totalParticlesToProduce = Math.floor(
    particlesPerMilli * state.timeElapsedSinceLastCreation,
  );

  state.timeElapsedSinceLastCreation -= Math.floor(
    totalParticlesToProduce / particlesPerMilli,
  );

  for (let i = 0; i < totalParticlesToProduce; i++) {
    state.particles.push({
      scale: random(10, 15) / 100,
      x: random(0, 100),
      y: 0,
      velocity: random(10, 20),
      directionInRadians: (random(50, 130) * Math.PI) / 180,
    });
  }
};

const update = (state: State) => {
  for (let i = 0; i < state.particles.length; i++) {
    const particle = state.particles[i];
    if (particle.y > 100) {
      state.particles.splice(i, 1);
      continue;
    }

    const velocity =
      (particle.velocity * state.timeElapsedSinceLastFrame) / 1000;

    particle.y += velocity * Math.sin(particle.directionInRadians);
    particle.x += velocity * Math.cos(particle.directionInRadians);
  }
};

const draw = (config: RendererConfig, state: State) => {
  const ctx = config.canvas.getContext('2d')!;

  ctx.clearRect(0, 0, config.canvasWidth, config.canvasHeight);

  state.particles.forEach((particle) => {
    ctx.drawImage(
      state.sprite,
      (particle.x * config.canvasWidth) / 100,
      (particle.y * config.canvasHeight) / 100,
      state.sprite.width * particle.scale,
      state.sprite.height * particle.scale,
    );
  });
};

export const startRendering = async (config: RendererConfig) => {
  const spriteRequest = await fetch('/snowball.png');
  const spriteResponse = await spriteRequest.blob();

  const sprite = await createImageBitmap(spriteResponse);

  let lastTimestamp = 0;
  const state: State = {
    sprite,
    particles: [],
    timeElapsedSinceLastCreation: 0,
    timeElapsedSinceLastFrame: 0,
  };

  const onFrame = (time: number) => {
    if (config.signal?.aborted) return;

    if (lastTimestamp === 0) {
      lastTimestamp = time;
    }

    const elapsedTime = Math.min(time - lastTimestamp, MAX_ELAPSED_TIME);
    state.timeElapsedSinceLastFrame = elapsedTime;

    lastTimestamp = time;

    update(state);
    createParticles(config, state);
    draw(config, state);

    requestAnimationFrame(onFrame);
  };

  requestAnimationFrame(onFrame);
};
