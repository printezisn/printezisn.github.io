import { fireSignal, SpriteComponent } from '@printezisn/game-engine';
import config from '../../config';
import gameState from '../../game-state';

class Boy extends SpriteComponent {
  constructor() {
    super({
      label: 'boy',
      resource: 'boy/boy-selection.png',
      position: { x: 224, y: 79.5 },
      anchor: { x: 0.5, y: 0.5 },
      interactive: true,
      cursor: 'pointer',
    });

    this.registerToSignal(
      config.signals.chooseCharacter,
      this._onCharacterSelection,
    );
  }

  protected onClick() {
    this.interactive = false;
    gameState.selectedCharacter = 'boy';
    fireSignal(config.signals.chooseCharacter);
  }

  private _onCharacterSelection() {
    if (gameState.selectedCharacter !== 'boy') {
      this.animate({
        from: { scaleX: 1, scaleY: 1 },
        to: { scaleX: 0, scaleY: 0 },
        duration: 0.2,
      });
    } else {
      this.animate({
        from: { scaleX: 1, scaleY: 1 },
        to: { scaleX: 1.1, scaleY: 1.1 },
        duration: 0.2,
        revert: true,
        repeat: 1,
      });
    }
  }
}

export default Boy;
