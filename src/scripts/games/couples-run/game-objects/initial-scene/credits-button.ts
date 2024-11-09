import { CreditsButtonComponent } from '@printezisn/game-engine';

class CreditsButton extends CreditsButtonComponent {
  constructor() {
    super({
      label: 'credits-button',
      resource: 'credits-button.png',
      hoverResource: 'credits-button-hover.png',
      interactive: true,
      cursor: 'pointer',
      position: { x: 155, y: 24 },
      alpha: 0,
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

export default CreditsButton;
