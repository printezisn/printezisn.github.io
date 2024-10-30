import SpriteComponent from '../../../../../lib/game-engine/components/sprite';
import gameState from '../../game-state';
import gameConfig from '../../../../../lib/game-engine/config';

type MoveState = 'idle' | 'run' | 'jump';
type ResourceType = 'boy' | 'girl';

const MAX_MOVE_SPRITES = 8;
const MOVE_SPRITES: {
  [x: string]: (resourceType: ResourceType, sprite: number) => string;
} = {
  run: (resourceType: ResourceType, sprite: number) =>
    `${resourceType}/run/${resourceType}-run-${sprite}.png`,
  jump: (resourceType: ResourceType, sprite: number) =>
    sprite <= 2
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

  protected onTick() {
    if (!gameState.started) return;
    if (this._moveState === 'idle') {
      this.changeState('run');
    }

    this._moveFrame++;
    if (this._moveFrame % gameConfig.speed.moveFrameInterval === 0) {
      this._moveFrame = 0;
      this._moveSprite = (this._moveSprite + 1) % MAX_MOVE_SPRITES;
      this.texture = MOVE_SPRITES[this._moveState](
        this._resourceType,
        this._moveSprite + 1,
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
}

export default Character;
