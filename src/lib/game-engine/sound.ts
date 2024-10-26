import { Sound, type IMediaInstance } from '@pixi/sound';
import gameState from './game-state';
import { Assets } from 'pixi.js';
import { Animation } from '../game-engine/animation';

interface PlaySoundOptions {
  loop?: boolean;
  volume?: number;
}

interface FadeInSoundOptions {
  fromVolume?: number;
  toVolume?: number;
  fadeDuration: number;
  loop?: boolean;
}

interface FadeOutSoundOptions {
  fadeDuration: number;
}

let sound!: Sound;
const playingSounds = new Map<string, IMediaInstance>();

export const initSound = () => {
  sound = Assets.get('audio/sounds.mp3');
  const sprites = Assets.get('audio/sounds.json');

  sound.muted = gameState.muted;
  sound.addSprites(sprites);
};

export const playSound = async (
  name: string,
  options = {} as PlaySoundOptions,
) => {
  const { loop = false, volume = 1 } = options;

  const playingSound = await sound.play({
    sprite: name,
    loop,
    volume,
    complete: () => playingSounds.delete(name),
  });

  playingSounds.set(name, playingSound);
};

export const fadeInSound = async (
  name: string,
  options: FadeInSoundOptions,
) => {
  const {
    fromVolume = 0.1,
    toVolume = 1,
    fadeDuration,
    loop = false,
  } = options;

  await playSound(name, { loop, volume: toVolume });

  const animation = new Animation({
    duration: fadeDuration,
    from: { volume: fromVolume },
    to: { volume: toVolume },
  });

  await animation.start(playingSounds.get(name));
};

export const stopSound = (name: string) => {
  playingSounds.get(name)?.stop();
  playingSounds.delete(name);
};

export const fadeOutSound = async (
  name: string,
  options: FadeOutSoundOptions,
) => {
  const playingSound = playingSounds.get(name);
  if (!playingSound) return;

  const { fadeDuration } = options;

  const animation = new Animation({
    duration: fadeDuration,
    from: { volume: playingSound.volume },
    to: { volume: 0 },
  });

  await animation.start(playingSound);
  stopSound(name);
};

export const setMute = (muted: boolean) => {
  sound.muted = muted;
};
