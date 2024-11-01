import type { AssetsManifest } from 'pixi.js';

interface Asset {
  alias: string;
  src: string;
  data?: any;
}

const config = {
  gameName: '',
  gameContainer: document.body,
  maxFPS: 60,
  debug: false,
  assets: {
    manifest: {} as AssetsManifest,
    extra: [] as Asset[],
  },
  colors: {
    backgroundColor: '#000000',
  },
  screen: {
    width: 1280,
    aspectRatio: 16 / 9,
  },
  tickIntervalMillis: 16,
  loadingScene: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 28,
    textColor: 0xffffff,
    keepAliveTimeMS: 2000,
  },
  signals: {
    onResize: 'onResize',
    onOrientationChange: 'onOrientationChange',
    onTick: 'onTick',
    destroyLoadingScene: 'destroyLoadingScene',
    showCredits: 'showCredits',
  },
  sounds: {
    click: 'click',
  },
};

export default config;
