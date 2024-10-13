import MovingBackgroundComponent from '../../../../lib/game-engine/components/moving-background';
import BaseScene from '../../../../lib/game-engine/scenes/base';
import { playSound, stopSound } from '../../../../lib/game-engine/sound';
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

    this.delay(2).then(() => {
      this._canContinue = true;
    });
  }

  protected async onClick() {
    if (!this._canContinue) return;

    this.interactive = false;

    stopSound();

    await Promise.all([
      playSound(engineConfig.sounds.click, false, 5),
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
