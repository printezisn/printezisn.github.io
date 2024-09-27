import TextComponent from '../../../framework/components/text';
import gameState from '../../../framework/game-state';

class Logo extends TextComponent {
  constructor() {
    super({
      text: 'COUPLES RUN',
      textColor: 0xffcc00,
      fontSize: 128,
      fontFamily: 'Lobster',
      anchor: { x: 0.5, y: 0 },
      position: { x: 0, y: 0 },
      strokeColor: 0xff0000,
      strokeWidth: 7,
      alpha: 0,
    });

    this.fontSize = this.desiredFontSize;
    this.onResize();
    this.animate({
      target: this,
      duration: 1,
      from: { alpha: 0, y: 0 },
      to: { alpha: 1, y: this.desiredPositionY },
    });
  }

  private get desiredPositionY() {
    return gameState.screen.orientation === 'landscape' ? 50 : 200;
  }

  private get desiredFontSize() {
    return gameState.screen.orientation === 'landscape' ? 128 : 86;
  }

  protected onResize() {
    this.x = gameState.screen.width / 2;
  }

  protected onOrientationChange() {
    this.stopAnimations();
    this.fontSize = this.desiredFontSize;
    this.y = this.desiredPositionY;
  }
}

export default Logo;
