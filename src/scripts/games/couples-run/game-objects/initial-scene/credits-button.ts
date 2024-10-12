import CreditsButtonComponent from '../../../../../lib/game-engine/components/credits-button';

class CreditsButton extends CreditsButtonComponent {
  constructor() {
    super({
      resource: 'credits-button.png',
      hoverResource: 'credits-button-hover.png',
      interactive: true,
      cursor: 'pointer',
      anchor: { x: 0.5, y: 0.5 },
      horizontalAlignment: 'center',
      verticalAlignment: 'bottom',
      margin: { x: 0, y: -50 },
      alpha: 0,
      scale: { x: 0.5, y: 0.5 },
    });

    this.animate({
      from: { scaleX: 0.5, scaleY: 0.5, alpha: 0 },
      to: { scaleX: 1, scaleY: 1, alpha: 1 },
      duration: 0.5,
      delay: 1.5,
    });
  }
}

export default CreditsButton;
