import MovingBackgroundComponent from '../../../../lib/game-engine/components/moving-background';
import BaseScene from '../../../../lib/game-engine/scenes/base';
import {
  fadeInSound,
  fadeOutSound,
  playSound,
} from '../../../../lib/game-engine/sound';
import config from '../config';
import engineConfig from '../../../../lib/game-engine/config';
import CTA from '../game-objects/initial-scene/cta';
import Logo from '../game-objects/initial-scene/logo';
import MovingBoy from '../game-objects/initial-scene/moving-boy';
import MovingGirl from '../game-objects/initial-scene/moving-girl';
import MovingPlatform from '../game-objects/initial-scene/moving-platform';
import Settings from '../game-objects/initial-scene/settings';
import { fireSignal } from '../../../../lib/game-engine/signals';

class InitialScene extends BaseScene {
  private _canContinue = false;

  async init() {
    this.interactive = true;

    this.addComponent(
      new MovingBackgroundComponent({
        label: 'city-bg',
        resource: 'city-bg.png',
      }),
    );
    this.addComponent(new MovingPlatform());
    this.addComponent(new MovingGirl());
    this.addComponent(new MovingBoy());
    this.addComponent(new Logo());
    this.addComponent(new CTA());
    this.addComponent(new Settings());

    fadeInSound(config.sounds.mainLoop, {
      loop: true,
      toVolume: 0.3,
      fadeDuration: 0.5,
    });

    this.delay(2).then(() => {
      this._canContinue = true;
    });
  }

  protected async onClick() {
    if (!this._canContinue) return;

    this.interactive = false;

    await Promise.all([
      playSound(engineConfig.sounds.click),
      fadeOutSound(config.sounds.mainLoop, { fadeDuration: 2 }),
      this.animate({
        from: { alpha: 1 },
        to: { alpha: 0 },
        duration: 2,
      }),
    ]);

    fireSignal(config.signals.goToIntro);
  }
}

export default InitialScene;
