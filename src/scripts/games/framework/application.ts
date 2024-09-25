import { Application, Assets } from 'pixi.js';
import config from './config';
import { debounce } from './helpers/closures';
import resize from './helpers/aspect-ratio-resizer';
import gameState from './game-state';
import type BaseScene from './scenes/base';
import LoadingScene from './scenes/loading';
import { fireSignal } from './signals';

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
  app.renderer.resize(width, height);
  fireSignal(config.signals.onResize);

  const orientationChanged = gameState.screen.orientation !== orientation;
  gameState.screen.orientation = orientation;
  if (orientationChanged) {
    fireSignal(config.signals.onOrientationChange);
  }
};

const handleContainerResize = () => {
  const resizeCallback = debounce(() => {
    resizeCanvas();
  }, 100);
  const containerResizeObservers = new ResizeObserver(() => {
    resizeCallback();
  });

  containerResizeObservers.observe(appContainer);
  resizeCanvas();
};

const handleTick = () => {
  let totalDeltaTime = 0;

  app.ticker.add((ticker) => {
    totalDeltaTime += ticker.deltaMS;
    while (totalDeltaTime >= config.speed.movementIntervalMillis) {
      fireSignal(config.signals.onTick);
      totalDeltaTime -= config.speed.movementIntervalMillis;
    }
  });
};

export const changeScene = (newScene: BaseScene) => {
  if (gameState.scene) {
    gameState.scene.destroy();
    app.stage.removeChild(gameState.scene.container.object);
  }

  gameState.scene = newScene;
  app.stage.addChild(gameState.scene.container.object);
};

export const initGame = async (game: string, container: HTMLElement) => {
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

  changeScene(new LoadingScene());
  handleContainerResize();
  handleTick();

  await Promise.all([
    new Promise((resolve) =>
      setTimeout(resolve, config.loadingScene.keepAliveTimeMS),
    ),
    (async () => {
      await Assets.init({
        basePath: `/games/${game}/assets`,
        manifest: 'manifest.json',
      });
      await Assets.loadBundle('default');
    })(),
  ]);

  fireSignal(config.signals.destroyLoadingScene);
};
