import { startRendering, type RendererConfig } from './renderer';
import Worker from './worker?worker';
import styles from './styles.scss?inline';

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(styles);

const BACKGROUND_PROCESSING_SUPPORTED = Boolean(window.OffscreenCanvas);

const debounce = (time: number, fn: () => void) => {
  let timerId: NodeJS.Timeout | undefined;

  return () => {
    if (timerId != null) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      timerId = undefined;

      fn();
    }, time);
  };
};

class Snowfall extends HTMLElement {
  static observedAttributes = [
    'min-date',
    'max-date',
    'particles-per-sec-landscape',
    'particles-per-sec-portrait',
  ];

  private root!: ShadowRoot;
  private eventsAbortController: AbortController | null = null;
  private renderingAbortController: AbortController | null = null;
  private rendererConfig!: RendererConfig;
  private worker: Worker | null = null;
  private orientation =
    window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait';

  private isInDateRange() {
    const [minMonth, minDay] = this.getAttribute('min-date')
      ?.split('-')
      .map((n) => Number(n.trim())) ?? [1, 1];

    const [maxMonth, maxDay] = this.getAttribute('max-date')
      ?.split('-')
      .map((n) => Number(n.trim())) ?? [12, 31];

    const now = new Date();

    const minYear = now.getFullYear();
    const maxYear =
      maxMonth < minMonth ? now.getFullYear() + 1 : now.getFullYear();

    const minDate = new Date(minYear, minMonth - 1, minDay);
    const maxDate = new Date(maxYear, maxMonth - 1, maxDay);

    return minDate <= now && now <= maxDate;
  }

  private updateRendererConfig() {
    const canvas = this.root.children[0] as HTMLCanvasElement;

    this.rendererConfig = this.rendererConfig ?? {};
    this.rendererConfig.canvasWidth = window.innerWidth;
    this.rendererConfig.canvasHeight = window.innerHeight;
    this.rendererConfig.canvas = canvas;
    this.rendererConfig.signal = this.renderingAbortController?.signal;
    this.rendererConfig.particlesPerSec = Number(
      this.getAttribute(`particles-per-sec-${this.orientation}`) ?? '10',
    );

    this.worker?.postMessage({
      ...this.rendererConfig,
      canvas: undefined,
      signal: undefined,
    });
  }

  private update() {
    this.updateRendererConfig();

    if (this.isInDateRange()) {
      if (!this.renderingAbortController) {
        this.eventsAbortController = new AbortController();
        this.renderingAbortController = new AbortController();

        const canvasElement = document.createElement('canvas');
        const canvas = BACKGROUND_PROCESSING_SUPPORTED
          ? canvasElement.transferControlToOffscreen()
          : canvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.root.appendChild(canvasElement);

        window.addEventListener(
          'resize',
          debounce(100, () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            this.orientation =
              window.innerWidth >= window.innerHeight
                ? 'landscape'
                : 'portrait';
            this.updateRendererConfig();
          }),
          {
            signal: this.eventsAbortController.signal,
          },
        );

        this.updateRendererConfig();

        if (BACKGROUND_PROCESSING_SUPPORTED) {
          this.worker = new Worker();
          this.worker.postMessage(
            {
              ...this.rendererConfig,
              canvas,
              signal: undefined,
            },
            [canvas],
          );
        } else {
          startRendering(this.rendererConfig!);
        }
      }
    } else if (this.renderingAbortController) {
      if (this.worker) {
        this.worker.terminate();
        this.worker = null;
      }

      this.renderingAbortController.abort();
      this.renderingAbortController = null;
      this.eventsAbortController?.abort();
      this.eventsAbortController = null;
      this.root.innerHTML = '';
    }
  }

  connectedCallback() {
    this.root = this.attachShadow({ mode: 'open' });
    this.root.adoptedStyleSheets.push(stylesheet);

    this.update();
  }

  disconnectedCallback() {
    this.eventsAbortController?.abort();
    this.renderingAbortController?.abort();
    this.worker?.terminate();
  }

  attributeChangedCallback() {
    if (!this.root) return;

    this.update();
  }
}

if (!customElements.get('snow-fall')) {
  customElements.define('snow-fall', Snowfall);
}
