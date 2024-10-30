import BaseScene from '../../../../lib/game-engine/scenes/base';
import { fadeInSound } from '../../../../lib/game-engine/sound';
import config from '../config';
import Background from '../game-objects/game-scene/background';
import Info from '../game-objects/game-scene/info';
import Platforms from '../game-objects/game-scene/platforms';
import gameState from '../game-state';

class GameScene extends BaseScene {
  async init() {
    this.alpha = 0;

    this.addComponent(new Background());
    this.addComponent(new Info());
    this.addComponent(new Platforms());

    await Promise.all([
      this.animate({
        from: { alpha: 0 },
        to: { alpha: 1 },
        duration: 1,
      }),
      fadeInSound(config.sounds.mainLoop, {
        toVolume: 0.3,
        fadeDuration: 0.5,
        loop: true,
      }),
    ]);

    await this.delay(1);
    gameState.started = true;
  }
}

export default GameScene;
