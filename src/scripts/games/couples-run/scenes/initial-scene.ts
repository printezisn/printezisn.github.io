import MovingBackgroundComponent from '../../../../lib/game-engine/components/moving-background';
import BaseScene from '../../../../lib/game-engine/scenes/base';
import { playSound } from '../../../../lib/game-engine/sound';
import config from '../config';
import CTA from '../game-objects/initial-scene/cta';
import Logo from '../game-objects/initial-scene/logo';
import MovingBoy from '../game-objects/initial-scene/moving-boy';
import MovingGirl from '../game-objects/initial-scene/moving-girl';
import MovingPlatform from '../game-objects/initial-scene/moving-platform';
import Settings from '../game-objects/initial-scene/settings';

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
    this.addComponent(new CTA());
    this.addComponent(new Settings());

    playSound(config.sounds.mainLoop);
  }
}

export default InitialScene;
