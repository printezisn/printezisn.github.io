import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import LoadingScene from './loading';
import { fireSignal } from '../signals';
import config from '../config';
import type TextComponent from '../components/text';
import gameState from '../game-state';

describe('framework loading scene', () => {
  let scene!: LoadingScene;

  beforeEach(() => {
    scene = new LoadingScene();
    gameState.screen.width = 500;
    gameState.screen.height = 600;
  });

  afterEach(() => {
    scene.destroy();
  });

  it('creates a text component', () => {
    expect(scene.container.components.length).toEqual(1);
  });

  it('updates text position when root container is resized', () => {
    const text = scene.container.components[0] as TextComponent;

    fireSignal(config.signals.onResize);

    expect(text.x).toEqual(250);
    expect(text.y).toEqual(300);
  });
});
