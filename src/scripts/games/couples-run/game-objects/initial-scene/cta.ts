import { TextComponent } from '@printezisn/game-engine';

class CTA extends TextComponent {
  constructor() {
    super({
      label: 'cta',
      text: 'Click to play',
      fontFamily: 'PressStart2P',
      fontSize: 24,
      textColor: 0xcccccc,
      anchor: { x: 0.5, y: 0.5 },
      alpha: 0,
      horizontalAlignment: 'center',
      verticalAlignment: 'center',
    });

    this.enter();
  }

  private async enter() {
    this.animate({
      from: { alpha: 0 },
      to: { alpha: 1 },
      duration: 0.5,
      repeat: -1,
      revert: true,
      delay: 1.5,
    });
  }
}

export default CTA;
