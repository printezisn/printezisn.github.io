import SpriteComponent from '../../../../../lib/game-engine/components/sprite';
import gameState from '../../game-state';
import engineGameState from '../../../../../lib/game-engine/game-state';
import {
  addPhysicalEntity,
  setMovement,
} from '../../../../../lib/game-engine/physics-engine';
import { fireSignal } from '../../../../../lib/game-engine/signals';
import config from '../../config';
import { playSound } from '../../../../../lib/game-engine/sound';

type MoveState = 'idle' | 'run' | 'jump';
type ResourceType = 'boy' | 'girl';

const MOVE_SPRITES = {
  run: (resourceType: ResourceType, sprite: number) =>
    `${resourceType}/run/${resourceType}-run-${(sprite % 8) + 1}.png`,
  jump: (resourceType: ResourceType, sprite: number) =>
    sprite <= 6
      ? `${resourceType}/${resourceType}-jump.png`
      : `${resourceType}/${resourceType}-idle.png`,
  idle: (resourceType: ResourceType, _: number) =>
    `${resourceType}/${resourceType}-idle.png`,
};

const MOVE_FRAME_INTERVAL = 5;

abstract class Character extends SpriteComponent {
  private _resourceType: ResourceType;
  private _moveFrame = 0;
  private _moveSprite = 0;
  private _moveState: MoveState = 'idle';
  private _onGround = false;
  private _currentJump = 0;
  private _pressing = false;
  private _pressed = false;
  private _increaseSpeedMilestone = 10000;
  private _canDamage = true;

  abstract get hasPressAndRelease(): boolean;
  abstract get totalAllowedJumps(): number;

  constructor(resourceType: ResourceType) {
    super({
      label: 'character',
      resource: MOVE_SPRITES['idle'](resourceType, 0),
      scale: { x: 2, y: 2 },
      position: { x: 130, y: -100 },
    });

    this._resourceType = resourceType;

    addPhysicalEntity({
      target: this,
      rectangle: {
        x: this.x + 49,
        y: this.y + 40,
        width: 46,
        height: 64,
      },
      movement: {
        linearMovement: {
          velocity: { x: 0, y: 0 },
        },
      },
      onUpdatePosition: this._updatePosition.bind(this),
    });
  }

  jump() {
    if (!this._canJump()) return;

    this._currentJump++;
    this.changeState('jump');
  }

  press() {
    if (!this.hasPressAndRelease || !this._canJump()) return;

    this._pressing = true;
    this._setVelocity();
  }

  release() {
    if (!this.hasPressAndRelease || !this._pressing || !this._canJump()) {
      return;
    }

    this._pressing = false;
    this._pressed = true;
    this.jump();
  }

  async damage() {
    if (!this._canDamage) return;

    this._canDamage = false;
    playSound(config.sounds.playerHit, { volume: 2 });

    fireSignal(config.signals.loseLifePoints, 1);

    const originalTint = this.tint;

    await this.animate({
      from: { tint: 0xffcc00 },
      to: { tint: 0xff0000 },
      duration: 0.2,
      repeat: 10,
      revert: true,
    });

    this.tint = originalTint;
    this._canDamage = true;
  }

  protected onTick() {
    if (!gameState.started) return;
    if (this._moveState === 'idle') {
      this.changeState('run');
    }

    this._moveFrame++;
    if (this._moveFrame % MOVE_FRAME_INTERVAL === 0) {
      this._moveFrame = 0;
      this._moveSprite++;
      this.texture = MOVE_SPRITES[this._moveState](
        this._resourceType,
        this._moveSprite,
      );
    }
  }

  protected changeState(state: MoveState) {
    this._moveState = state;
    this._moveFrame = 0;
    this._moveSprite = 0;
    this.texture = MOVE_SPRITES[this._moveState](
      this._resourceType,
      this._moveSprite + 1,
    );
    this._setVelocity();
  }

  private _updatePosition(x: number, y: number, onGround: boolean) {
    this.x = x - 49;
    this.y = y - 40;
    this._onGround = onGround;

    if (this.y > engineGameState.screen.height + 100) {
      fireSignal(config.signals.loseLifePoints, config.lifePoints);
      return;
    }

    fireSignal(config.signals.moveScreen, this.x - 130);

    if (onGround && this._moveState !== 'run' && gameState.started) {
      this._pressed = false;
      this._currentJump = 0;
      this.changeState('run');
    }

    if (this._canIncreaseSpeed()) {
      gameState.speed++;
      this._increaseSpeedMilestone = this.x + 10000;
    }
  }

  private _canIncreaseSpeed() {
    return this.x >= this._increaseSpeedMilestone;
  }

  private _canJump() {
    if (!gameState.started) return false;
    if (
      this._moveState === 'jump' &&
      this._currentJump < this.totalAllowedJumps
    ) {
      return true;
    }

    return this._moveState === 'run' && this._onGround;
  }

  private _setVelocity() {
    const { x, y } = this._getNewVelocity();

    setMovement(this, {
      linearMovement: {
        velocity: { x, y },
      },
    });
  }

  private _getNewVelocity() {
    if (this._moveState === 'jump') {
      return {
        x: gameState.speed,
        y: this._pressed ? -15 : -10,
      };
    }
    if (this._moveState === 'run') {
      return {
        x: this._pressing ? gameState.speed / 2 : gameState.speed,
        y: 0,
      };
    }

    return { x: 0, y: 0 };
  }
}

export default Character;
