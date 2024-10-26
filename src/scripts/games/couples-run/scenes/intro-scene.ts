import MovingBackgroundComponent from '../../../../lib/game-engine/components/moving-background';
import TextComponent from '../../../../lib/game-engine/components/text';
import gameState from '../../../../lib/game-engine/game-state';
import BaseScene from '../../../../lib/game-engine/scenes/base';
import {
  fadeInSound,
  fadeOutSound,
  playSound,
} from '../../../../lib/game-engine/sound';
import config from '../config';
import engineConfig from '../../../../lib/game-engine/config';
import Selection from '../game-objects/intro-scene/selection';

const TEXTS = [
  'The night has fallen deep and the young(?)\ncouple is ready to get married',
  'But a tragedy happens',
  "They're out of drinks in the party",
  'They go out to get drinks for their guests',
  'but they engage into a zombie apocalypse',
  '',
  'Collect as many drinks as you can to\nincrease your score',
  'You lose a life point each time\nan enemy touches you',
  "It's game over if you lose 3 life points\nor you fall into a pit",
  'Click to jump and avoid enemies and pits',
  'Anastasia reduces her speed while you click\nand jumps higher when you release',
  'Nikos can perform a double jump if you\nclick again while jumping',
  '',
  'Choose your character',
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
      ...this._createTexts(TEXTS, true),
      ...this._createTexts(TEXTS, false),
      fadeInSound(config.sounds.menuLoop, {
        toVolume: 0.3,
        fadeDuration: 0.5,
        loop: true,
      }),
      this.animate({ from: { alpha: 0 }, to: { alpha: 1 }, duration: 2 }),
    ]);

    const selection = new Selection();
    this.addComponent(selection);

    selection.animate({ from: { alpha: 0 }, to: { alpha: 1 }, duration: 1 });

    this.registerToSignal(
      config.signals.chooseCharacter,
      this._onCharacterSelection,
    );
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
    let textIndex = 0;
    let colorIndex = 0;
    let distance = 20;
    const colors = [0xcccccc, 0xffcc00];
    const promises: Promise<void>[] = [];

    texts.forEach((text) => {
      if (!text) {
        colorIndex = (colorIndex + 1) % colors.length;
        distance += 10;
        return;
      }

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
          textColor: colors[colorIndex],
          anchor: { x: 0.5, y: 0 },
          alpha: 0,
          horizontalAlignment: 'center',
          position: { x: 0, y: distance },
          visible,
        });

        this.addComponent(component);
        promises.push(
          component.animate({
            from: { alpha: 0 },
            to: { alpha: 1 },
            duration: 2,
            delay: 2 + textIndex * 2,
          }),
        );

        labelIndex++;
        distance += 40;
        this._totalTexts++;
      });

      textIndex++;
    });

    return promises;
  }

  private async _onCharacterSelection() {
    await Promise.all([
      playSound(engineConfig.sounds.click),
      fadeOutSound(config.sounds.menuLoop, { fadeDuration: 2 }),
      this.animate({
        from: { alpha: 1 },
        to: { alpha: 0 },
        duration: 2,
      }),
    ]);
  }
}

export default IntroScene;
