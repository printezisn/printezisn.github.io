---
title: Creating a fireplace with Canvas API
description: This post contains a step-by-step guide which explains how you to create a simple fireplace animation using Canvas API. It has animating flames and sparks.
excerpt: This post contains a step-by-step guide which explains how you to create a simple fireplace animation using Canvas API. It has animating flames and sparks.
categories:
  - js
  - animations
date: 2025-05-15
lastUpdate: 2025-05-15
image:
  href: ../../assets/posts/creating-fireplace-with-canvas-api/fireplace.png
  alt: A fireplace in cartoonish style
---

Well, everyone loves a good animation and everyone definitely loves a fireplace. It's beautiful and soothing for the soul! And JS animations just melt my heart, so I wanted to combine these two ambitions and create a digital fireplace. But why create it only for myself and not create a walkthrough guide while I'm making it?

Let's dive in and see how we can create a fireplace animation step by step.

### 1. Create the web component

The first step is all about the basis and the skeleton of the web component (by the way, I'll be using Typescript for the purposes of this guide).

```ts
class Fireplace extends HTMLElement {
  private canvas!: HTMLCanvasElement;

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    this.canvas = document.createElement('canvas');
    shadow.appendChild(this.canvas);
  }
}

export default Fireplace;
```

### 2. Add a spritesheet with flame frames

Let's analyze what a flame animation is in a 2D world. It's a set of images which showcase a flame in different states, which keep switching and give the impression of an animation. Pretty much like a gif image.

A spritesheet is an image containing other inner images and is helpful because we can load all of them with a single request rather than multiple. In this case, the spritesheet contains images that represent different states of the flame.

We can find a spritesheet online, for example this <a href="https://opengameart.org/content/animated-flame-fire-sprite-sheet" target="_blank" rel="noreferrer nofollow">animated flame spritesheet</a> from <a href="https://opengameart.org/" target="_blank" rel="noreferrer nofollow">OpenGameArt.org</a>, which contains great resources for game development.

![animated flame spritesheet](/fire-sheet.png)

### 3. Create array of different frames

The spritesheet contains 25 frames of size 128x128. Let's store the information into an array.

```ts
const FRAMES = Object.freeze(
  Array(25)
    .fill(0)
    .map((_, i) => ({ x: i * 128, y: 0 })),
);
```

### 4. Render a bunch of flames

At first, let's decide the width and height of the canvas. Please note that this doesn't have to do with the dimensions it has on the page. It has to do with resolution. For example, if the canvas is 1920x1080 and the dimensions it has on the page are 640x360, then the canvas's content will be scaled down by half.

Let's set the canvas to be 1920x1080 (that's 16:9 resolution).

```ts
this.canvas = document.createElement('canvas');
this.canvas.width = 1920;
this.canvas.height = 1080;
this.canvas.style.width = '100%';
this.canvas.style.height = '100%';
shadow.appendChild(this.canvas);
```

and then let's render some flames!

```ts
const FRAMES = Object.freeze(
  Array(25)
    .fill(0)
    .map((_, i) => ({ x: i * 128, y: 0 })),
);

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const DIST_PER_FLAME = 30;
const TOTAL_FLAMES = Math.ceil(CANVAS_WIDTH / DIST_PER_FLAME);

const flames = Array(TOTAL_FLAMES)
  .fill(0)
  .map((_, i) => ({
    x: -50 + DIST_PER_FLAME * i,
    y: CANVAS_HEIGHT - 110,
    frame: 0,
  }));

class Fireplace extends HTMLElement {
  private canvas!: HTMLCanvasElement;
  private image!: HTMLImageElement;

  private get context() {
    return this.canvas.getContext('2d')!;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    this.canvas = document.createElement('canvas');
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    shadow.appendChild(this.canvas);

    this.image = new Image();
    this.image.src = '/fire-sheet.png';

    this.image.addEventListener('load', () => {
      this._render();
    });
  }

  private _render() {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this._renderFlames();
  }

  private _renderFlames() {
    flames.forEach((flame) => {
      this.context.drawImage(
        this.image,
        FRAMES[flame.frame].x,
        FRAMES[flame.frame].y,
        128,
        128,
        flame.x,
        flame.y,
        128,
        128,
      );
    });
  }
}

export default Fireplace;
```

Now every flame has the same appearance. Let's add some variety by setting a random frame for each flame.

```ts
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const flames = Array(TOTAL_FLAMES)
  .fill(0)
  .map((_, i) => ({
    x: -50 + DIST_PER_FLAME * i,
    y: CANVAS_HEIGHT - 110,
    frame: getRandomInt(0, FRAMES.length),
  }));
```

### 5. Create flame animation

Now we have drawn a bunch of flames but it's nothing more than a static graphic. Let's continuously switch images to create an animation. This is done easily with the following code.

```ts
const FRAMES = Object.freeze(
  Array(25)
    .fill(0)
    .map((_, i) => ({ x: i * 128, y: 0 })),
);

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const DIST_PER_FLAME = 30;
const TOTAL_FLAMES = Math.ceil(CANVAS_WIDTH / DIST_PER_FLAME);

const MAX_FPS = 60;
const MILLIS_PER_FRAME = 1000 / MAX_FPS;

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const flames = Array(TOTAL_FLAMES)
  .fill(0)
  .map((_, i) => ({
    x: -50 + DIST_PER_FLAME * i,
    y: CANVAS_HEIGHT - 110,
    frame: getRandomInt(0, FRAMES.length),
  }));

class Fireplace extends HTMLElement {
  private canvas!: HTMLCanvasElement;
  private lastUpdateTime: number = 0;
  private image!: HTMLImageElement;

  private get context() {
    return this.canvas.getContext('2d')!;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    this.canvas = document.createElement('canvas');
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    shadow.appendChild(this.canvas);

    this.image = new Image();
    this.image.src = '/fire-sheet.png';

    this.image.addEventListener('load', () => {
      requestAnimationFrame((time) => this._render(time));
    });
  }

  private _render(time: number) {
    while (time - this.lastUpdateTime >= MILLIS_PER_FRAME) {
      this.lastUpdateTime = time;
      this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      this._renderFlames();
    }

    requestAnimationFrame((time) => this._render(time));
  }

  private _renderFlames() {
    flames.forEach((flame) => {
      this.context.drawImage(
        this.image,
        FRAMES[flame.frame].x,
        FRAMES[flame.frame].y,
        128,
        128,
        flame.x,
        flame.y,
        128,
        128,
      );

      flame.frame = (flame.frame + 1) % FRAMES.length;
    });
  }
}

export default Fireplace;
```

You'll notice that I set a maximum number of frames per second. This is a limit to ensure that we won't overload the browser. Now the flames are animating but you'll notice that they are animating too fast. Let's add a limit to update the canvas only every 2 frames.

```ts
const FRAMES = Object.freeze(
  Array(25)
    .fill(0)
    .map((_, i) => ({ x: i * 128, y: 0 })),
);

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const DIST_PER_FLAME = 30;
const TOTAL_FLAMES = Math.ceil(CANVAS_WIDTH / DIST_PER_FLAME);

const MAX_FPS = 60;
const MILLIS_PER_FRAME = 1000 / MAX_FPS;
const FRAME_TO_UPDATE = 2;

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const flames = Array(TOTAL_FLAMES)
  .fill(0)
  .map((_, i) => ({
    x: -50 + DIST_PER_FLAME * i,
    y: CANVAS_HEIGHT - 110,
    frame: getRandomInt(0, FRAMES.length),
  }));

class Fireplace extends HTMLElement {
  private canvas!: HTMLCanvasElement;
  private lastUpdateTime: number = 0;
  private image!: HTMLImageElement;
  private currentFrame: number = 0;

  private get context() {
    return this.canvas.getContext('2d')!;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    this.canvas = document.createElement('canvas');
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    shadow.appendChild(this.canvas);

    this.image = new Image();
    this.image.src = '/fire-sheet.png';

    this.image.addEventListener('load', () => {
      requestAnimationFrame((time) => this._render(time));
    });
  }

  private _render(time: number) {
    while (time - this.lastUpdateTime >= MILLIS_PER_FRAME) {
      this.lastUpdateTime = time;

      this.currentFrame = (this.currentFrame + 1) % FRAME_TO_UPDATE;
      if (this.currentFrame !== 1) continue;

      this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      this._renderFlames();
    }

    requestAnimationFrame((time) => this._render(time));
  }

  private _renderFlames() {
    flames.forEach((flame) => {
      this.context.drawImage(
        this.image,
        FRAMES[flame.frame].x,
        FRAMES[flame.frame].y,
        128,
        128,
        flame.x,
        flame.y,
        128,
        128,
      );

      flame.frame = (flame.frame + 1) % FRAMES.length;
    });
  }
}

export default Fireplace;
```

### 6. Add spark particles

Now we have a nice flame animation, but you know what is missing ? Some nice sparks floating around. They can be designed as small orange circles with a random velocity on the X axis, a random velocity on the Y axis, a random radius and a random life time. These parameters ensure that there is variety and the animations looks as natural as possible.

Here's the update code with the sparks' animation.

```ts
interface Spark {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  totalFrames: number;
}

const FRAMES = Object.freeze(
  Array(25)
    .fill(0)
    .map((_, i) => ({ x: i * 128, y: 0 })),
);

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const DIST_PER_FLAME = 30;
const TOTAL_FLAMES = Math.ceil(CANVAS_WIDTH / DIST_PER_FLAME);

const MAX_FPS = 60;
const MILLIS_PER_FRAME = 1000 / MAX_FPS;
const FRAME_TO_UPDATE = 2;

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const flames = Array(TOTAL_FLAMES)
  .fill(0)
  .map((_, i) => ({
    x: -50 + DIST_PER_FLAME * i,
    y: CANVAS_HEIGHT - 110,
    frame: getRandomInt(0, FRAMES.length),
  }));

const sparks: Spark[] = [];
const NEW_SPARKS_PER_FRAME = 5;

class Fireplace extends HTMLElement {
  private canvas!: HTMLCanvasElement;
  private lastUpdateTime: number = 0;
  private image!: HTMLImageElement;
  private currentFrame: number = 0;

  private get context() {
    return this.canvas.getContext('2d')!;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    this.canvas = document.createElement('canvas');
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    shadow.appendChild(this.canvas);

    this.image = new Image();
    this.image.src = '/fire-sheet.png';

    this.image.addEventListener('load', () => {
      requestAnimationFrame((time) => this._render(time));
    });
  }

  private _render(time: number) {
    while (time - this.lastUpdateTime >= MILLIS_PER_FRAME) {
      this.lastUpdateTime = time;

      this.currentFrame = (this.currentFrame + 1) % FRAME_TO_UPDATE;
      if (this.currentFrame !== 1) continue;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.globalAlpha = 1;
      this._renderFlames();
      this._generateNewSparks();
      this._renderSparks();
    }

    requestAnimationFrame((time) => this._render(time));
  }

  private _renderFlames() {
    flames.forEach((flame) => {
      this.context.drawImage(
        this.image,
        FRAMES[flame.frame].x,
        FRAMES[flame.frame].y,
        128,
        128,
        flame.x,
        flame.y,
        128,
        128,
      );

      flame.frame = (flame.frame + 1) % FRAMES.length;
    });
  }

  private _generateNewSparks() {
    for (let i = 0; i < NEW_SPARKS_PER_FRAME; i++) {
      sparks.push({
        x: getRandomInt(0, CANVAS_WIDTH),
        y: CANVAS_HEIGHT - 20,
        radius: getRandomInt(2, 5),
        vx: getRandomInt(-3, 3),
        vy: getRandomInt(-3, 0),
        totalFrames: getRandomInt(50, 70),
      });
    }
  }

  private _renderSparks() {
    for (let i = 0; i < sparks.length; i++) {
      const spark = sparks[i];

      this.context.beginPath();
      this.context.arc(spark.x, spark.y, spark.radius, 0, 2 * Math.PI);
      this.context.globalAlpha =
        spark.totalFrames < 10 ? spark.totalFrames / 10 : 1;
      this.context.fillStyle = '#d1632e';
      this.context.fill();

      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.totalFrames--;
      if (spark.totalFrames === 0) {
        sparks.splice(i, 1);
        i--;
      }
    }
  }
}

export default Fireplace;
```

### Conclusion

In this post, we built an entire fireplace animation using only a single flame spritesheet and Canvas API. The final verdict is that 2D graphics and animations in JS are not so hard.

If you want to see a live demonstration of the end result, you can do it by clicking <a href="#" class="create-fireplace">here</a>.
