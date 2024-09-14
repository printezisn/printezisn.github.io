import { Application } from 'pixi.js';
import type baseConfig from './base-config';
import { debounce } from './helpers/closures';
import resize from './helpers/aspect-ratio-resizer';
import gameState from './game-state';

let app!: Application;
let appContainer!: HTMLElement;
let appConfig!: typeof baseConfig;

const resizeCanvas = () => {
  const { width, height, orientation } = resize(
    appContainer,
    app.canvas,
    appConfig.screen.width,
    appConfig.screen.height,
  );

  gameState.screen.width = width;
  gameState.screen.height = height;
  gameState.screen.orientation = orientation;
};

const handleContainerResize = () => {
  const resizeCallback = debounce(() => {
    resizeCanvas();
  });
  const containerResizeObservers = new ResizeObserver(() => {
    resizeCallback();
  });

  containerResizeObservers.observe(appContainer);
  resizeCanvas();
};

export const initGame = async (
  container: HTMLElement,
  config: typeof baseConfig,
) => {
  appContainer = container;
  appConfig = config;
  appContainer.style.backgroundColor = config.colors.backgroundColor;

  app = new Application();

  await app.init({
    backgroundColor: config.colors.backgroundColor,
    width: config.screen.width,
    height: config.screen.height,
  });

  appContainer.appendChild(app.canvas);

  handleContainerResize();
};
