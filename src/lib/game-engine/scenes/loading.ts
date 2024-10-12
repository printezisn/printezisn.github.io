import config from '../config';
import TextComponent from '../components/text';
import ContainerComponent from '../components/container';

class LoadingScene extends ContainerComponent {
  constructor() {
    super({});

    this.addComponent(
      new TextComponent({
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
