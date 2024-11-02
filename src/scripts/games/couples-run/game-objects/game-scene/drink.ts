import SpriteComponent from '../../../../../lib/game-engine/components/sprite';
import type { Point } from '../../../../../lib/game-engine/components/types';
import { addPhysicalEntity } from '../../../../../lib/game-engine/physics-engine';
import { fireSignal } from '../../../../../lib/game-engine/signals';
import { playSound } from '../../../../../lib/game-engine/sound';
import config from '../../config';
import gameState from '../../game-state';
import Character from './character';

class Drink extends SpriteComponent {
  constructor(position: Point, distance: number) {
    super({
      label: `drink-${position.x}-${position.y}`,
      resource: 'drink.png',
      position,
      scale: { x: 3, y: 3 },
    });

    addPhysicalEntity({
      target: this,
      rectangle: {
        x: distance + this.x,
        y: this.y,
        width: this.width,
        height: this.height,
      },
      onCollision: async (entity) => {
        if (entity instanceof Character) {
          gameState.score += 10;
          fireSignal(config.signals.updateScore);
          playSound(config.sounds.coin, { volume: 2 });
          this.destroy();
        }
      },
    });

    this.animate({
      from: { y: this.y },
      to: { y: this.y - 5 },
      duration: 1,
      repeat: -1,
      revert: true,
    });
  }
}

export default Drink;
