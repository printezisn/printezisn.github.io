import { VolumeButtonComponent } from '@printezisn/game-engine';

class VolumeButton extends VolumeButtonComponent {
  constructor() {
    super({
      label: 'volume-button',
      resource: 'volume-on.png',
      hoverResource: 'volume-on-hover.png',
      mutedResource: 'volume-off.png',
      mutedHoverResource: 'volume-off-hover.png',
      interactive: true,
      cursor: 'pointer',
      alpha: 0,
      position: { x: 24, y: 24 },
      scale: { x: 0.5, y: 0.5 },
      anchor: { x: 0.5, y: 0.5 },
    });

    this.animate({
      from: { alpha: 0, scaleX: 0.5, scaleY: 0.5 },
      to: { alpha: 1, scaleX: 1, scaleY: 1 },
      duration: 0.5,
      delay: 1.5,
    });
  }
}

export default VolumeButton;
