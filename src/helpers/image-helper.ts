export const IMAGE_WIDTHS = [768, 1024, 1280, 1920, 2500];
export const IMAGE_SIZES = IMAGE_WIDTHS.map((w, i) => {
  if (i === IMAGE_WIDTHS.length - 1) {
    return `${w}px`;
  }

  return `(max-width: ${w}px) ${w}px`;
}).join(', ');
