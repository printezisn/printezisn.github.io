import SpriteComponent from '../../../../../lib/game-engine/components/sprite';
import gameState from '../../game-state';
import engineGameState from '../../../../../lib/game-engine/game-state';
import {
  addPhysicalEntity,
  setVelocity,
} from '../../../../../lib/game-engine/physics-engine';
import { fireSignal } from '../../../../../lib/game-engine/signals';
import config from '../../config';

type MoveState = 'idle' | 'run' | 'jump';
type ResourceType = 'boy' | 'girl';

const MOVE_SPRITES: {
  [x: string]: (resourceType: ResourceType, sprite: number) => string;
} = {
  run: (resourceType: ResourceType, sprite: number) =>
    `${resourceType}/run/${resourceType}-run-${(sprite % 8) + 1}.png`,
  jump: (resourceType: ResourceType, sprite: number) =>
    sprite <= 6
      ? `${resourceType}/${resourceType}-jump.png`
      : `${resourceType}/${resourceType}-idle.png`,
  idle: (resourceType: ResourceType) =>
    `${resourceType}/${resourceType}-idle.png`,
};

const MOVE_FRAME_INTERVAL = 5;

class Character extends SpriteComponent {
  private _resourceType: ResourceType;
  private _moveFrame = 0;
  private _moveSprite = 0;
  private _moveState: MoveState = 'idle';
  private _onGround = false;

  protected get moveState() {
    return this._moveState;
  }

  get hasPressAndRelease() {
    return false;
  }

  protected get onGround() {
    return this._onGround;
  }

  protected set onGround(onGround: boolean) {
    this._onGround = onGround;
  }

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
      linearMovement: {
        velocity: { x: 0, y: 0 },
      },
      onUpdatePosition: this._updatePosition.bind(this),
    });
  }

  jump() {}

  press() {}

  release() {}

  protected async onTick() {
    if (!gameState.started) return;
    if (this._moveState === 'idle') {
      this.changeState('run');
      setVelocity(this, { x: gameState.speed, y: 0 });
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
  }

  private _updatePosition(x: number, y: number, onGround: boolean) {
    const newX = x - 49;
    const delta = newX - this.x;

    this.x = newX;
    this.y = y - 40;
    this.onGround = onGround;

    if (this.y > engineGameState.screen.height + 100) {
      fireSignal(config.signals.loseLifePoints, config.lifePoints);
      return;
    }

    fireSignal(config.signals.moveScreen, delta);

    if (onGround && this.moveState !== 'run' && gameState.started) {
      this.changeState('run');
      setVelocity(this, { x: gameState.speed, y: 0 });
    }
  }
}

export default Character;
