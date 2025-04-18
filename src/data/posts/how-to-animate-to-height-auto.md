---
title: How to animate from height 0 to auto
description: Vertical expansion is one of the classic animations every front-end engineer encounters. In this post, we’ll explore 4 different ways to do vertical expansion.
excerpt: Vertical expansion is one of the classic animations every front-end engineer encounters. When a user clicks, hidden content is revealed line by line. While it's straightforward to achieve this with JS, the addition of CSS transitions has made many developers eager to implement it using just CSS. But is it possible? Well… yes and no. In this post, we’ll explore 4 different ways to accomplish vertical expansion.
categories:
  - js
  - css
date: 2024-09-29
lastUpdate: 2024-09-29
image:
  href: ../../assets/posts/how-to-animate-to-height-auto/dropdown-menu.png
  alt: A computer screen showing dropdown menus
---

Vertical expansion is one of the classic animations every front-end engineer encounters. When a user clicks, hidden content is revealed line by line. While it's straightforward to achieve this with JS, the addition of CSS transitions has made many developers eager to implement it using just CSS. But is it possible? Well… yes and no.

In this post, we’ll explore 4 different ways to accomplish animated vertical expansion.

### 1. Using the interpolate-size CSS property

Ideally, the following CSS snippet should be enough to achieve the transition with just CSS.

```css
.hidden-content {
  height: 0;
  overflow: hidden;
  transition: height 0.5s ease;

  &.opened {
    height: auto;
  }
}
```

But it's not. If you follow this approach, you'll notice that the hidden content is revealed immediately and the transition is not happening (<a href="https://codepen.io/Nikos-Printezis/pen/JjgYKWE" target="_blank" rel="nofollow noreferrer">codepen</a>).

The `interpolate-size` CSS property enables transitions of CSS intrinsic sizing keywords like `auto`.

```css
:root {
  interpolate-size: allow-keywords;
}

.hidden-content {
  height: 0;
  overflow: hidden;
  transition: height 0.5s ease;

  &.opened {
    height: auto;
  }
}
```

If you check this <a href="https://codepen.io/Nikos-Printezis/pen/PoMPzJd" target="_blank" rel="nofollow noreferrer">codepen</a> you'll notice that the transition works like a charm. Everything looks fantastic except one thing. At the time of writing, `interpolate-size` is only supported by Chrome (<a href="https://caniuse.com/?search=interpolate-size" target="_blank" rel="nofollow noreferrer">caniuse</a>).

### 2. Using the calc-size CSS function

The `calc-size` CSS function enables mathematical calculations on intrinsic sizes...like `auto`.

```css
.hidden-content {
  height: 0;
  overflow: hidden;
  transition: height 0.5s ease;

  &.opened {
    height: calc-size(auto, size);
  }
}
```

Here's another <a href="https://codepen.io/Nikos-Printezis/pen/rNXOLJe" target="_blank" rel="nofollow noreferrer">codepen</a> to try the function. Same as above, it works like a charm but is currently supported only by Chrome (<a href="https://caniuse.com/?search=calc-size" target="_blank" rel="nofollow noreferrer">caniuse</a>).

### 3. Using max-height for the transition

If the resulting height wasn't `auto`, but a high value (e.g. 1000px), the CSS transition would work just fine. However, the element would have a huge height, most probably resulting into a broken UI. But what about the good old `max-height` ? It can produce the same effect and not force a huge height.

```css
.hidden-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;

  &.opened {
    max-height: 1000px;
  }
}
```

There is a problem though. We have to set a high value for `max-height` but we don't know how much is good enough. Should it be 100px, 1000px, 9999px ? We can set a really high value, but this affects the transition, because it's different to go from 0 to 1000px in 500ms and different to go from 0 to 99999px in 500ms (<a href="https://codepen.io/Nikos-Printezis/pen/bGXVexy" target="_blank" rel="nofollow noreferrer">codepen</a>).

### 4. Letting JS give us a helping hand

This approach combines the power of CSS and JS to achieve a precise transition (<a href="https://codepen.io/Nikos-Printezis/pen/ZEgbOZp" target="_blank" rel="nofollow noreferrer">codepen</a>).

**HTML:**

```html
<p>
  <button type="button" id="toggle">Open</button>
</p>
<div class="hidden-content" id="hidden-content">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed leo ante,
  convallis non blandit vitae, rutrum a neque. Nam efficitur, neque quis
  faucibus consectetur, est est condimentum nibh, ut viverra nisi elit nec
  augue. Suspendisse dictum nulla neque, nec sollicitudin ante facilisis vel.
  Cras feugiat sagittis ligula, rutrum maximus massa rhoncus a. Pellentesque
  lobortis vel metus vel vehicula. Aliquam lobortis mauris ac ex ornare, a
  dignissim ipsum rutrum. Orci varius natoque penatibus et magnis dis parturient
  montes, nascetur ridiculus mus. Mauris gravida pharetra libero, sollicitudin
  sollicitudin magna maximus at. Donec sit amet neque orci. Suspendisse nec
  massa nec purus malesuada rutrum vel et quam. Nulla eu elit non quam commodo
  viverra. Sed gravida, erat at tristique elementum, justo tortor tincidunt
  augue, ac vestibulum felis lectus id risus. Sed cursus, metus nec tristique
  semper, justo tortor consequat arcu, ut vehicula nulla augue vitae lectus.
  Fusce mauris tellus, vestibulum consequat mi dictum, ornare volutpat sem.
  Phasellus ultrices, purus vitae ultrices cursus, nisi sapien venenatis tellus,
  a commodo lacus ligula id magna. Pellentesque blandit, est id fermentum
  aliquet, elit erat tincidunt turpis, dapibus fringilla ipsum nunc nec mi.
  Vestibulum quis odio placerat, interdum velit eget, sodales orci. Donec vitae
  metus eget turpis commodo sodales. Fusce pulvinar eros et ipsum gravida
  aliquet. Mauris tristique nisi sed dui tincidunt suscipit. Phasellus ultrices
  magna in gravida faucibus. Maecenas vel semper orci, vel feugiat nisi.
  Phasellus luctus et dolor vitae faucibus. Maecenas vehicula leo in elit luctus
  vehicula. Quisque eget posuere metus. Proin eu tellus dapibus, tristique
  mauris a, maximus nisl. Proin blandit felis vel porttitor accumsan.
  Suspendisse luctus ante vel ipsum auctor luctus. Etiam orci diam, ornare ac
  aliquam sollicitudin, malesuada nec lorem. In hac habitasse platea dictumst.
  Cras cursus tempus massa, sed lacinia diam maximus at. Quisque sed lacus quis
  libero auctor aliquet eu et ipsum. Donec congue ante ut eleifend bibendum.
  Pellentesque ut nunc non ligula elementum lobortis. Nulla viverra rhoncus
  ligula, vitae mollis nulla convallis pulvinar. Integer et aliquam massa. Sed
  accumsan erat nulla, nec blandit diam lobortis nec. Nulla fermentum, lectus
  vel feugiat rhoncus, nunc lectus tempus eros, ac pellentesque ex elit quis
  enim. Morbi eleifend elementum sollicitudin. Sed lorem ipsum, tincidunt sit
  amet nibh a, euismod varius lorem. Lorem ipsum dolor sit amet, consectetur
  adipiscing elit. Sed ac justo sed ante lobortis euismod et sed ligula. In in
  neque tempus, interdum risus sed, lacinia lorem. Interdum et malesuada fames
  ac ante ipsum primis in faucibus. Duis accumsan lectus in purus sollicitudin
  placerat. Vivamus vel laoreet odio, vel mollis dui. Suspendisse sit amet
  maximus leo, sed aliquam urna. Duis fringilla mi hendrerit, malesuada sapien
  eget, efficitur augue. Quisque quis imperdiet risus, vel facilisis arcu.
</div>
```

**CSS:**

```css
.hidden-content {
  height: 0;
  overflow: hidden;
  transition: height 0.5s ease;
}
```

**JS:**

```js
const toggle = document.getElementById('toggle');
const hiddenContent = document.getElementById('hidden-content');

const openHiddenContent = () => {
  const realHeight = hiddenContent.scrollHeight;

  hiddenContent.addEventListener(
    'transitionend',
    () => {
      hiddenContent.style.height = 'auto';
    },
    { once: true },
  );

  hiddenContent.style.height = `${realHeight}px`;
};

const closeHiddenContent = () => {
  const realHeight = hiddenContent.scrollHeight;

  hiddenContent.style.height = `${realHeight}px`;

  setTimeout(() => {
    hiddenContent.style.height = '0';
  }, 0);
};

toggle.addEventListener('click', () => {
  if (toggle.innerHTML === 'Open') {
    openHiddenContent();
    toggle.innerHTML = 'Close';
  } else {
    closeHiddenContent();
    toggle.innerHTML = 'Open';
  }
});
```
