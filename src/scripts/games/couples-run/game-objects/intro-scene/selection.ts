import { ContainerComponent } from '@printezisn/game-engine';
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
  }
}

export default Selection;
