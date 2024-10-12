interface Asset {
  alias: string;
  src: string;
  data?: any;
}

const config = {
  gameName: '',
  gameContainer: document.body,
  extraAssets: [] as Asset[],
  maxFPS: 60,
  debug: false,
  colors: {
    backgroundColor: '#000000',
  },
  screen: {
    width: 1280,
    aspectRatio: 4 / 3,
  },
  speed: {
    tickIntervalMillis: 17,
    moveFrameInterval: 5,
  },
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
};

export default config;
