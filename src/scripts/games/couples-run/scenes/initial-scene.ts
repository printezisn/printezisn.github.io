import MovingBackgroundComponent from '../../framework/components/moving-background';
import BaseScene from '../../framework/scenes/base';
import MovingPlatform from '../game-objects/moving-platform';

class InitialScene extends BaseScene {
  constructor() {
    super({});

    this.addComponent(
      new MovingBackgroundComponent({
        resource: 'city-bg.png',
      }),
    );
    this.addComponent(new MovingPlatform());
  }
}

export default InitialScene;
