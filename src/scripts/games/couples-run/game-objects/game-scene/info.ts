import ContainerComponent from '../../../../../lib/game-engine/components/container';
import Rectangle from '../../../../../lib/game-engine/components/rectangle';
import TextComponent from '../../../../../lib/game-engine/components/text';
import { fireSignal } from '../../../../../lib/game-engine/signals';
import { fadeOutSound, playSound } from '../../../../../lib/game-engine/sound';
import config from '../../config';
import gameState from '../../game-state';

class Info extends ContainerComponent {
  private _totalLifePoints: number;

  constructor() {
    super({
      label: 'info',
      position: { x: 20, y: 20 },
    });

    let dist =
      this.addComponent(
        new TextComponent({
          label: 'life-points-indicator',
          text: 'Life Points:',
          fontFamily: 'PressStart2P',
          fontSize: 16,
          textColor: 0xcccccc,
          position: { x: 0, y: 3 },
        }),
      ).width + 10;

    for (let i = 0; i < config.lifePoints; i++) {
      dist +=
        this.addComponent(
          new Rectangle({
            label: `life-point-${i}`,
            fillColor: 0x2fff00,
            width: 10,
            height: 20,
            position: { x: dist, y: 0 },
          }),
        ).width + 15;
    }

    dist +=
      this.addComponent(
        new Rectangle({
          label: 'separator',
          fillColor: 0xcccccc,
          width: 3,
          height: 20,
          position: { x: dist + 10, y: 0 },
        }),
      ).width + 25;

    dist +=
      this.addComponent(
        new TextComponent({
          label: 'score-indicator',
          text: 'Score:',
          fontFamily: 'PressStart2P',
          fontSize: 16,
          textColor: 0xcccccc,
          position: { x: dist, y: 3 },
        }),
      ).width + 10;

    this.addComponent(
      new TextComponent({
        label: 'score',
        text: gameState.score.toString(),
        fontFamily: 'PressStart2P',
        fontSize: 16,
        textColor: 0xcccccc,
        position: { x: dist, y: 3 },
        bitmap: true,
      }),
    );

    this._totalLifePoints = config.lifePoints;
    this.registerToSignal(
      config.signals.loseLifePoints,
      this._removeLifePoints,
    );
  }

  private async _removeLifePoints(total: number) {
    for (let i = this.components.length - 1; i >= 0 && total > 0; i--) {
      if (!this.components[i].label.startsWith('life-point-')) continue;

      this.removeComponent(this.components[i]);
      i++;

      this._totalLifePoints--;
      if (this._totalLifePoints === 0) {
        gameState.started = false;
        fadeOutSound(config.sounds.mainLoop, { fadeDuration: 0.5 });
        playSound(config.sounds.gameOver);
        await this.delay(4);
        fireSignal(config.signals.gameOver);
        break;
      }
    }
  }
}

export default Info;
