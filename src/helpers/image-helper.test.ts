import { describe, expect, it } from 'vitest';
import { IMAGE_SIZES, IMAGE_WIDTHS } from './image-helper';

describe('image helper', () => {
  it('returns correct image widths', () => {
    expect(IMAGE_WIDTHS).toEqual([768, 1024, 1280, 1920, 2500]);
  });

  it('returns correct image sizes', () => {
    expect(IMAGE_SIZES).toEqual(
      '(max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, (max-width: 1920px) 1920px, 2500px',
    );
  });
});
