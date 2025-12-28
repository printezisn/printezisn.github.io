import { startRendering, type RendererConfig } from './renderer';

const config: any = {};
let started = false;

self.onmessage = (event) => {
  const data = event.data ?? {};

  for (const key in data) {
    if (data[key] !== undefined) {
      config[key] = data[key];
    }
  }

  if (config.canvas) {
    config.canvas.width = config.canvasWidth;
    config.canvas.height = config.canvasHeight;
  }

  if (!started) {
    started = true;
    startRendering(config as RendererConfig);
  }
};
