const resize = (
  container: HTMLElement,
  canvas: HTMLCanvasElement,
  desiredWidth: number,
  desiredHeight: number,
) => {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  if (containerWidth < containerHeight) {
    const temp = desiredWidth;
    desiredWidth = desiredHeight;
    desiredHeight = temp;
  }

  const scale = Math.min(
    containerWidth / desiredWidth,
    containerHeight / desiredHeight,
  );

  const canvasWidth = Math.floor(scale * desiredWidth);
  const canvasHeight = Math.floor(scale * desiredHeight);
  const canvasLeft = (containerWidth - canvasWidth) / 2;
  const canvasTop = (containerHeight - canvasHeight) / 2;

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  canvas.style.left = `${canvasLeft}px`;
  canvas.style.top = `${canvasTop}px`;
  canvas.width = desiredWidth;
  canvas.height = desiredHeight;

  const orientation: 'portrait' | 'landscape' =
    desiredWidth < desiredHeight ? 'portrait' : 'landscape';

  return {
    width: desiredWidth,
    height: desiredHeight,
    orientation,
  };
};

export default resize;
