const config = {
  colors: {
    backgroundColor: '#000000',
  },
  screen: {
    width: 1280,
    height: 720,
  },
  speed: {
    movementIntervalMillis: 17,
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
  },
};

export default config;
