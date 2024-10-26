import ContainerComponent from '../../../../../lib/game-engine/components/container';
import gameState from '../../../../../lib/game-engine/game-state';
import Boy from './boy';
import Girl from './girl';

class Selection extends ContainerComponent {
  constructor() {
    super({
      label: 'character-selection',
      horizontalAlignment: 'center',
      width: 288,
      height: 159,
      anchor: { x: 0.5, y: 0 },
      alpha: 0,
    });

    this.addComponent(new Girl());
    this.addComponent(new Boy());

    this.onOrientationChange();
  }

  protected onOrientationChange() {
    this.y = gameState.screen.orientation === 'portrait' ? 761 : 521;
  }
}

export default Selection;
