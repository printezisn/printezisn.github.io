import SpriteComponent from '../../../framework/components/sprite';
import config from '../../../framework/config';
import gameState from '../../../framework/game-state';

const TOTAL_RUN_SPRITES = 8;

class MovingBoy extends SpriteComponent {
  private _runSprite = 0;
  private _moveFrame = 0;

  constructor() {
    super({
      resource: 'boy/run/boy-run-1.png',
      anchor: { x: 0, y: 1 },
      position: { x: 160, y: 0 },
      scale: { x: 1.2, y: 1.2 },
    });

    this.onResize();
  }

  protected onResize() {
    this.position.y = gameState.screen.height - 8;
  }

  protected onTick() {
    this._moveFrame++;
    if (this._moveFrame % config.speed.moveFrameInterval === 0) {
      this._moveFrame = 0;
      this._runSprite = (this._runSprite + 1) % TOTAL_RUN_SPRITES;
      this.texture = `boy/run/boy-run-${this._runSprite + 1}.png`;
    }
  }
}

export default MovingBoy;
