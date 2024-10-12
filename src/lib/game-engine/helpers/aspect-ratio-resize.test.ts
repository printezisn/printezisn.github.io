import { describe, expect, it } from 'vitest';
import resize from './aspect-ratio-resizer';

describe('game engine aspect ratio resizer helper', () => {
  it('returns sizes in landscape', () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    Object.defineProperty(document.body, 'clientWidth', {
      writable: true,
      value: 1000,
    });
    Object.defineProperty(document.body, 'clientHeight', {
      writable: true,
      value: 800,
    });

    const { width, height, orientation } = resize(
      document.body,
      canvas,
      1280,
      720,
    );

    expect(width).toEqual(1280);
    expect(height).toEqual(720);
    expect(orientation).toEqual('landscape');
    expect(canvas.width).toEqual(1280);
    expect(canvas.height).toEqual(720);
    expect(canvas.style.width).toEqual('1000px');
    expect(canvas.style.height).toEqual('562px');
  });

  it('returns sizes in portrait', () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    Object.defineProperty(document.body, 'clientWidth', {
      writable: true,
      value: 800,
    });
    Object.defineProperty(document.body, 'clientHeight', {
      writable: true,
      value: 1000,
    });

    const { width, height, orientation } = resize(
      document.body,
      canvas,
      1280,
      720,
    );

    expect(width).toEqual(720);
    expect(height).toEqual(1280);
    expect(orientation).toEqual('portrait');
    expect(canvas.width).toEqual(720);
    expect(canvas.height).toEqual(1280);
    expect(canvas.style.width).toEqual('562px');
    expect(canvas.style.height).toEqual('1000px');
  });
});
