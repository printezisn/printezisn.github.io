import MovingBackgroundComponent from '../../framework/components/moving-background';
import BaseScene from '../../framework/scenes/base';
import Logo from '../game-objects/initial-scene/logo';
import MovingBoy from '../game-objects/initial-scene/moving-boy';
import MovingGirl from '../game-objects/initial-scene/moving-girl';
import MovingPlatform from '../game-objects/initial-scene/moving-platform';

class InitialScene extends BaseScene {
  constructor() {
    super({});

    this.addComponent(
      new MovingBackgroundComponent({
        resource: 'city-bg.png',
      }),
    );
    this.addComponent(new MovingPlatform());
    this.addComponent(new MovingGirl());
    this.addComponent(new MovingBoy());
    this.addComponent(new Logo());
  }
}

export default InitialScene;
