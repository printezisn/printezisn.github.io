import config from '../config';
import TextComponent from '../components/text';
import BaseScene from './base';

class LoadingScene extends BaseScene {
  async init() {
    this.addComponent(
      new TextComponent({
        label: 'loading-text',
        text: 'Loading...',
        anchor: { x: 0.5, y: 0.5 },
        fontFamily: config.loadingScene.fontFamily,
        fontSize: config.loadingScene.fontSize,
        textColor: config.loadingScene.textColor,
        horizontalAlignment: 'center',
        verticalAlignment: 'center',
      }),
    );
  }
}

export default LoadingScene;
