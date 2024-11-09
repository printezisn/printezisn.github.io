import { ContainerComponent } from '@printezisn/game-engine';
import CreditsButton from './credits-button';
import VolumeButton from './volume-button';

class Settings extends ContainerComponent {
  constructor() {
    super({
      label: 'settings',
      horizontalAlignment: 'center',
      verticalAlignment: 'bottom',
      width: 230,
      height: 48,
      margin: { x: 0, y: -200 },
    });

    this.addComponent(new VolumeButton());
    this.addComponent(new CreditsButton());
  }
}

export default Settings;
