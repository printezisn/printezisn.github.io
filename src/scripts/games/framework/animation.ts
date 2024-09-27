import gsap from 'gsap';

export interface AnimationOptions {
  target: any;
  from: any;
  to: any;
  duration: number;
  repeat?: number;
  revert?: boolean;
  ease?: string;
}

export class Animation {
  private _options: AnimationOptions;
  private _tween: gsap.core.Tween | null = null;

  constructor(options: AnimationOptions) {
    this._options = options;
  }

  get options() {
    return this._options;
  }

  start() {
    return new Promise<void>((resolve) => {
      this._tween = gsap.fromTo(this.options.target, this.options.from, {
        ...this.options.to,
        onComplete: () => resolve(),
        duration: this.options.duration,
        repeat: this.options.repeat,
        yoyo: this.options.revert,
        ease: this.options.ease,
      });
      this._tween.play();
    });
  }

  stop() {
    this._tween?.kill();
  }

  pause() {
    this._tween?.pause();
  }

  resume() {
    this._tween?.resume();
  }
}
