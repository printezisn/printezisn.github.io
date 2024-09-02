export const IMAGE_WIDTHS = [768, 1024, 1280, 1920, 2500];
export const IMAGE_SIZES = IMAGE_WIDTHS.map((w, i) => {
  if (i === 0) return `(max-width: ${w}px) ${w}px`;
  if (i === IMAGE_WIDTHS.length - 1) {
    return `(min-width: ${IMAGE_WIDTHS[i - 1] + 1}px) ${w}px`;
  }

  return `((min-width: ${IMAGE_WIDTHS[i - 1] + 1}px) and (max-width: ${w}px)) ${w}px`;
}).join(', ');
