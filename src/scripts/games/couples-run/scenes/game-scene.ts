import BaseScene from '../../../../lib/game-engine/scenes/base';
import { fadeInSound } from '../../../../lib/game-engine/sound';
import { debounce } from '../../sudoku/lib/helpers/timing-helpers';
import config from '../config';
import Background from '../game-objects/game-scene/background';
import Boy from '../game-objects/game-scene/boy';
import type Character from '../game-objects/game-scene/character';
import Girl from '../game-objects/game-scene/girl';
import Info from '../game-objects/game-scene/info';
import Platforms from '../game-objects/game-scene/platforms';
import gameState from '../game-state';

class GameScene extends BaseScene {
  private _cancelClickDebounce: (() => void) | null = null;
  private _keepingClick = false;

  private get _character() {
    return this.components[3] as Character;
  }

  async init() {
    this.alpha = 0;
    this.interactive = true;

    this.addComponent(new Background());
    this.addComponent(new Info());
    this.addComponent(new Platforms());
    this.addComponent(
      gameState.selectedCharacter === 'girl' ? new Girl() : new Boy(),
    );

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

  protected onClick() {
    if (!gameState.started) return;
    if (!this._character.hasPressAndRelease) {
      this._character.jump();
      return;
    }

    this._keepingClick = false;

    const { start, cancel } = debounce(
      () => {
        this._keepingClick = true;
        this._character.press();
      },
      () => {},
      500,
      0,
    );

    this._cancelClickDebounce = cancel;
    start();
  }

  protected onPointerUp() {
    if (!gameState.started || !this._character.hasPressAndRelease) return;

    this._cancelClickDebounce?.();
    this._cancelClickDebounce = null;

    if (this._keepingClick) {
      this._character.release();
    } else {
      this._character.jump();
    }
  }
}

export default GameScene;
