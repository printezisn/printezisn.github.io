import TextComponent from '../../../framework/components/text';
import gameState from '../../../framework/game-state';

class CTA extends TextComponent {
  constructor() {
    super({
      text: 'Click to play',
      fontFamily: 'PressStart2P',
      fontSize: 24,
      textColor: 0xcccccc,
      anchor: { x: 0.5, y: 0.5 },
      alpha: 0,
    });

    this.onResize();
    this.enter();
  }

  protected onResize() {
    this.x = gameState.screen.width / 2;
    this.y = gameState.screen.height / 2;
  }

  private async enter() {
    await this.delay(1.5);
    this.animate({
      target: this,
      from: { alpha: 0 },
      to: { alpha: 1 },
      duration: 0.5,
      repeat: -1,
      revert: true,
    });
  }
}

export default CTA;
