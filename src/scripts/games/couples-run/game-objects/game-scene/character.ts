import SpriteComponent from '../../../../../lib/game-engine/components/sprite';
import gameState from '../../game-state';
import gameConfig from '../../../../../lib/game-engine/config';
import type { Point } from '../../../../../lib/game-engine/components/types';

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

class Character extends SpriteComponent {
  private _resourceType: ResourceType;
  private _moveFrame = 0;
  private _moveSprite = 0;
  private _moveState: MoveState = 'idle';
  private _velocity: Point = { x: 0, y: 0 };
  private _acceleration: Point = { x: 0, y: 0 };

  protected get moveState() {
    return this._moveState;
  }

  protected get velocity() {
    return this._velocity;
  }

  protected get acceleration() {
    return this._acceleration;
  }

  protected set acceleration(acceleration: Point) {
    this._acceleration = acceleration;
  }

  protected set velocity(velocity: Point) {
    this._velocity = velocity;
  }

  get hasPressAndRelease() {
    return false;
  }

  constructor(resourceType: ResourceType) {
    super({
      label: 'character',
      resource: MOVE_SPRITES['idle'](resourceType, 0),
      anchor: { x: 0, y: 1 },
      scale: { x: 2, y: 2 },
      position: { x: 130, y: 0 },
      margin: { x: 0, y: -55 },
      verticalAlignment: 'bottom',
    });

    this._resourceType = resourceType;
  }

  jump() {}

  press() {}

  release() {}

  protected onTick() {
    if (!gameState.started) return;
    if (this._moveState === 'idle') {
      this.changeState('run');
    }

    this._moveFrame++;
    if (this._moveFrame % gameConfig.speed.moveFrameInterval === 0) {
      this._moveFrame = 0;
      this._moveSprite++;
      this.texture = MOVE_SPRITES[this._moveState](
        this._resourceType,
        this._moveSprite,
      );
    }

    this.x += this._velocity.x;
    this.y += this._velocity.y;
    this._velocity.x += this._acceleration.x;
    this._velocity.y += this._acceleration.y;
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
}

export default Character;
