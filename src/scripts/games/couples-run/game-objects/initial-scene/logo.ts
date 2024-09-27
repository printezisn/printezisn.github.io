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
      position: { x: 0, y: 50 },
      strokeColor: 0xff0000,
      strokeWidth: 7,
    });

    this.onResize();
    this.onOrientationChange();
  }

  protected onResize() {
    this.x = gameState.screen.width / 2;
  }

  protected onOrientationChange() {
    if (gameState.screen.orientation === 'landscape') {
      this.fontSize = 128;
      this.y = 50;
    } else {
      this.fontSize = 86;
      this.y = 200;
    }
  }
}

export default Logo;
