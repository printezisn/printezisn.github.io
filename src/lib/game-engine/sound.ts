import { Sound } from '@pixi/sound';
import gameState from './game-state';
import { Assets } from 'pixi.js';

let sound!: Sound;

export const initSound = () => {
  sound = Assets.get('audio/sounds.mp3');
  const sprites = Assets.get('audio/sounds.json');

  sound.muted = gameState.muted;
  sound.addSprites(sprites);
};

export const playSound = (name: string, loop = false) => {
  sound.play({
    sprite: name,
    loop,
  });
};

export const setMute = (muted: boolean) => {
  sound.muted = muted;
};
