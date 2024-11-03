import SpriteComponent from '../../../../../lib/game-engine/components/sprite';
import gameState from '../../game-state';
import {
  addPhysicalEntity,
  movePhysicalEntity,
  setMovement,
} from '../../../../../lib/game-engine/physics-engine';
import type {
  DisplayObject,
  Point,
} from '../../../../../lib/game-engine/components/types';
import Character from './character';
import engineGameState from '../../../../../lib/game-engine/game-state';
import config from '../../config';

const MOVE_FRAME_INTERVAL = 5;

class Zombie extends SpriteComponent {
  private _started = false;
  private _distance = 0;
  private _moveFrame = 0;
  private _moveSprite = 0;
  private _acceleration = 0;

  constructor(position: Point, distance: number) {
    super({
      label: `position-${position.x}-${position.y}`,
      resource: 'zombie/walk/zombie-walk-1.png',
      position,
      scale: { x: 0.2, y: 0.2 },
    });

    this._distance = distance;

    addPhysicalEntity({
      target: this,
      rectangle: {
        x: this._distance + this.x,
        y: this.y,
        width: this.width,
        height: this.height,
      },
      onUpdatePosition: this._updatePosition.bind(this),
      onCollision: this._onCollision.bind(this),
    });

    this.registerToSignal(config.signals.moveScreen, this._onMoveScreen);
  }

  protected onTick() {
    if (!this._started || !gameState.started) return;

    if (this.x + this.width >= 0) {
      movePhysicalEntity(this, -1, 0);
    } else {
      this._acceleration++;
      movePhysicalEntity(this, 0, this._acceleration);
    }

    this._moveFrame++;
    if (this._moveFrame % MOVE_FRAME_INTERVAL === 0) {
      this._moveFrame = 0;
      this._moveSprite++;
      this.texture = `zombie/walk/zombie-walk-${(this._moveSprite % 10) + 1}.png`;
    }
  }

  private _updatePosition(x: number, y: number) {
    this.x = x - this._distance;
    this.y = y;
  }

  private _onCollision(entity: DisplayObject) {
    if (gameState.started && entity instanceof Character) {
      (entity as Character).damage();
    }
  }

  private _onMoveScreen(x: number) {
    if (!gameState.started) return;

    if (x + engineGameState.screen.width >= this._distance + this.x) {
      this._started = true;
      setMovement(this, {
        linearMovement: {
          velocity: { x: -1, y: 0 },
        },
      });
      this.unregisterFromSignal(config.signals.moveScreen);
    }
  }
}

export default Zombie;
