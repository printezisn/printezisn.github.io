import MovingBackgroundComponent from '../../../../lib/game-engine/components/moving-background';
import TextComponent from '../../../../lib/game-engine/components/text';
import gameState from '../../../../lib/game-engine/game-state';
import BaseScene from '../../../../lib/game-engine/scenes/base';
import { fadeInSound } from '../../../../lib/game-engine/sound';
import config from '../config';

const TEXTS = [
  'The night has fallen deep and the young(?)\ncouple is ready to get married',
  'But a tragedy happens',
  "They're out of drinks in the party",
  'They go out to get drinks for their guests',
  'but they engage into a zombie apocalypse',
  'Choose your character and collect\nas many drinks as you can',
  'while avoiding the pits\nand the enemies coming after you',
];

class IntroScene extends BaseScene {
  private _totalTexts = 0;

  async init() {
    this.alpha = 0;

    this.addComponent(
      new MovingBackgroundComponent({
        label: 'city-bg',
        resource: 'city-bg.png',
      }),
    );

    await Promise.all([
      this._createTexts(TEXTS, true),
      this._createTexts(TEXTS, false),
      fadeInSound(config.sounds.menuLoop, {
        toVolume: 0.3,
        fadeDuration: 0.5,
        loop: true,
      }),
      this.animate({ from: { alpha: 0 }, to: { alpha: 1 }, duration: 2 }),
    ]);
  }

  protected onOrientationChange() {
    for (let i = 1; i <= this._totalTexts; i++) {
      this.components[i].visible = this.components[i].label.endsWith(
        gameState.screen.orientation,
      );
    }
  }

  private _createTexts(texts: string[], landscape: boolean) {
    let labelIndex = 0;
    const promises: Promise<void>[] = [];

    texts.forEach((text, textIndex) => {
      const visible =
        gameState.screen.orientation === (landscape ? 'landscape' : 'portrait');
      const paragraphs = landscape
        ? [text.replace(/\n/g, ' ')]
        : text.split('\n');

      paragraphs.forEach((paragraph) => {
        const component = new TextComponent({
          label: `text-${labelIndex}-${landscape ? 'landscape' : 'portrait'}`,
          text: paragraph,
          fontFamily: 'PressStart2P',
          fontSize: 16,
          textColor: 0xcccccc,
          anchor: { x: 0.5, y: 0 },
          alpha: 0,
          horizontalAlignment: 'center',
          position: { x: 0, y: 20 + labelIndex * 40 },
          visible,
        });

        this.addComponent(component);
        promises.push(
          component.animate({
            from: { alpha: 0 },
            to: { alpha: 1 },
            duration: 3,
            delay: 2 + textIndex * 3,
          }),
        );

        labelIndex++;
        this._totalTexts++;
      });
    });

    return promises;
  }
}

export default IntroScene;
