import { SpriteComponent } from '@printezisn/game-engine';

const TOTAL_RUN_SPRITES = 8;
const MOVE_FRAME_INTERVAL = 5;

class MovingGirl extends SpriteComponent {
  private _runSprite = 0;
  private _moveFrame = 0;

  constructor() {
    super({
      label: 'moving-girl',
      resource: 'girl/run/girl-run-1.png',
      anchor: { x: 0, y: 1 },
      position: { x: 200, y: 0 },
      scale: { x: 2, y: 2 },
      verticalAlignment: 'bottom',
      margin: { x: 0, y: -55 },
    });
  }

  protected onTick() {
    this._moveFrame++;
    if (this._moveFrame % MOVE_FRAME_INTERVAL === 0) {
      this._moveFrame = 0;
      this._runSprite = (this._runSprite + 1) % TOTAL_RUN_SPRITES;
      this.texture = `girl/run/girl-run-${this._runSprite + 1}.png`;
    }
  }
}

export default MovingGirl;
