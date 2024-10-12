import TextComponent from '../../../../../lib/game-engine/components/text';
import gameState from '../../../../../lib/game-engine/game-state';

class Logo extends TextComponent {
  constructor() {
    super({
      text: 'COUPLES RUN',
      textColor: 0xffcc00,
      fontSize: 128,
      fontFamily: 'Lobster',
      anchor: { x: 0.5, y: 0 },
      position: { x: 0, y: 50 },
      strokeColor: 0xff0000,
      strokeWidth: 7,
      alpha: 0,
      horizontalAlignment: 'center',
    });

    this.fontSize = this.desiredFontSize;
    this.animate({
      duration: 1,
      from: { alpha: 0, y: 0 },
      to: { alpha: 1, y: 50 },
      ease: 'back.out(2)',
    });
  }

  private get desiredFontSize() {
    return gameState.screen.orientation === 'landscape' ? 128 : 86;
  }

  protected onOrientationChange() {
    this.stopAnimations();
    this.fontSize = this.desiredFontSize;
    this.y = 50;
  }
}

export default Logo;
