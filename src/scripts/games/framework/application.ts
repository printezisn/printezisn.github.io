import { Application } from 'pixi.js';
import config from './config';
import { debounce } from './helpers/closures';
import resize from './helpers/aspect-ratio-resizer';
import gameState from './game-state';

let app!: Application;
let appContainer!: HTMLElement;

const resizeCanvas = () => {
  const { width, height, orientation } = resize(
    appContainer,
    app.canvas,
    config.screen.width,
    config.screen.height,
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

export const initGame = async (container: HTMLElement) => {
  appContainer = container;
  appContainer.style.backgroundColor = config.colors.backgroundColor;

  app = new Application();

  await app.init({
    backgroundColor: config.colors.backgroundColor,
    width: config.screen.width,
    height: config.screen.height,
  });

  appContainer.appendChild(app.canvas);
  app.canvas.style.position = 'absolute';

  handleContainerResize();
};
