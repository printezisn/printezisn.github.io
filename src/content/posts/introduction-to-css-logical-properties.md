---
title: Introduction to CSS logical properties
description: CSS logical properties define layout in logical rather than physical dimensions and help us structure content easily in languages with different text direction.
excerpt: CSS logical properties define layout in logical rather than physical dimensions and help us structure content easily in languages with different text direction (e.g. Chinese and Japanese).
categories:
  - css
date: 2024-10-25
---

Before discussing what CSS logical properties are, let's see an example first. Imagine that we are building something simple, like a horizontal list of text messages.

```html
<ul class="horizontal-list">
  <li>I am text message no. 1 and I come first in the list</li>
  <li>I am text message no. 2 and I come second in the list</li>
  <li>I am text message no. 3 and I come third in the list</li>
</ul>
```

Of course we use CSS to define the layout of the list and each message.

```css
.horizontal-list {
  list-style: none;
  white-space: nowrap;
  padding: 0;
  margin: 0;

  li {
    white-space: normal;
    margin-left: 50px;
    width: 200px;
    display: inline-block;
    vertical-align: top;
  }

  li:first-child {
    margin-left: 0;
  }
}
```

and the result is the following:

<div class="code-result">
  <template shadowrootmode="open">
    <style>
      .horizontal-list {
        list-style: none;
        white-space: nowrap;
        padding: 0;
        margin: 0;
        li {
          white-space: normal;
          margin-left: 50px;
          width: 200px;
          display: inline-block;
          vertical-align: top;
        }
        li:first-child {
          margin-left: 0;
        }
      }
    </style>
    <ul class="horizontal-list">
      <li>I am text message no. 1 and I come first in the list</li>
      <li>I am text message no. 2 and I come second in the list</li>
      <li>I am text message no. 3 and I come third in the list</li>
    </ul>
  </template>
</div>

---

### Time for globalization

Let's assume now that the widget has become so popular that we want to create variations in other languages too. It's not a problem to make a Spanish or French version, but what about Arabic ? It's written in RTL (Right to Left). Adding a `dir="rtl"` attribute to the element should fix the issue, right ? Let's see how it looks like.

<div class="code-result" dir="rtl">
  <template shadowrootmode="open">
    <style>
      .horizontal-list {
        list-style: none;
        white-space: nowrap;
        padding: 0;
        margin: 0;
        li {
          white-space: normal;
          margin-left: 50px;
          width: 200px;
          display: inline-block;
          vertical-align: top;
        }
        li:first-child {
          margin-left: 0;
        }
      }
    </style>
    <ul class="horizontal-list" dir="rtl">
      <li>I am text message no. 1 and I come first in the list</li>
      <li>I am text message no. 2 and I come second in the list</li>
      <li>I am text message no. 3 and I come third in the list</li>
    </ul>
  </template>
</div>

Notice something strange ? There is no margin between the first and second message, while there is one between the second and third message. That's because we have a `margin-left` rule in the CSS. It must be converted into `margin-right` in RTL languages.

```css
.horizontal-list {
  list-style: none;
  white-space: nowrap;
  padding: 0;
  margin: 0;

  li {
    white-space: normal;
    margin-left: 50px;
    width: 200px;
    display: inline-block;
    vertical-align: top;
  }

  li:first-child {
    margin-left: 0;
  }
}

[dir='rtl'].horizontal-list {
  li {
    margin-left: 0;
    margin-right: 50px;
  }

  li:first-child {
    margin-right: 0;
  }
}
```

<div class="code-result" dir="rtl">
  <template shadowrootmode="open">
    <style>
      .horizontal-list {
        list-style: none;
        white-space: nowrap;
        padding: 0;
        margin: 0;
        li {
          white-space: normal;
          margin-left: 50px;
          width: 200px;
          display: inline-block;
          vertical-align: top;
        }
        li:first-child {
          margin-left: 0;
        }
      }
      [dir='rtl'].horizontal-list {
        li {
          margin-left: 0;
          margin-right: 50px;
        }
        li:first-child {
          margin-right: 0;
        }
      }
    </style>
    <ul class="horizontal-list" dir="rtl">
      <li>I am text message no. 1 and I come first in the list</li>
      <li>I am text message no. 2 and I come second in the list</li>
      <li>I am text message no. 3 and I come third in the list</li>
    </ul>
  </template>
</div>

Now it looks much better!

---

### Time to release in another continent

The widget has unparalleled success and we were asked to release it in various countries throughout Asia. Some of the new languages we have to take into account are written top to bottom and right to left. This means that `margin-left` has to become `margin-top` and `width` has to become `height`.

```css
.horizontal-list {
  list-style: none;
  white-space: nowrap;
  padding: 0;
  margin: 0;

  li {
    white-space: normal;
    margin-left: 50px;
    width: 200px;
    display: inline-block;
    vertical-align: top;
  }

  li:first-child {
    margin-left: 0;
  }
}

[dir='rtl'].horizontal-list {
  li {
    margin-left: 0;
    margin-right: 50px;
  }

  li:first-child {
    margin-right: 0;
  }
}

.vertical-rl.horizontal-list {
  writing-mode: vertical-rl;

  li {
    margin-left: 0;
    margin-top: 50px;
    width: auto;
    height: 200px;
  }

  li:first-child {
    margin-top: 0;
  }
}
```

<div class="code-result">
  <template shadowrootmode="open">
    <style>
      .horizontal-list {
        list-style: none;
        white-space: nowrap;
        padding: 0;
        margin: 0;
        li {
          white-space: normal;
          margin-left: 50px;
          width: 200px;
          display: inline-block;
          vertical-align: top;
        }
        li:first-child {
          margin-left: 0;
        }
      }
      [dir='rtl'].horizontal-list {
        li {
          margin-left: 0;
          margin-right: 50px;
        }
        li:first-child {
          margin-right: 0;
        }
      }
      .vertical-rl.horizontal-list {
        writing-mode: vertical-rl;
        li {
          margin-left: 0;
          margin-top: 50px;
          width: auto;
          height: 200px;
        }
        li:first-child {
          margin-top: 0;
        }
      }
    </style>
    <ul class="horizontal-list vertical-rl">
      <li>I am text message no. 1 and I come first in the list</li>
      <li>I am text message no. 2 and I come second in the list</li>
      <li>I am text message no. 3 and I come third in the list</li>
    </ul>
  </template>
</div>

We managed to achieve the expected result in every case, but we have to add more and more CSS rules to cover each language type. And imagine doing that for every element in an entire enterprise project. Here's where CSS logical properties shine.

---

### Enter CSS logical properties

Traditional CSS properties define layout in physical dimensions. For example, `width` is the horizontal size of an element, `height` is the vertical size, `margin-left` is the margin on the left side, etc. The logical properties, as the name implies, define the layout in logical dimensions. For example, `inline-size` is the size of an element in the dimension which is parallel to the flow of text, `block-size` is the size in the dimension perpendicular to the flow of text, etc.

Here are some common logical properties:

- `inline-size` instead of `width`.
- `block-size` instead of `height`.
- `margin-inline-start` instead of `margin-left`.
- `margin-inline-end` instead of `margin-right`.
- `margin-block-start` instead of `margin-top`.
- `margin-block-end` instead of `margin-bottom`.
- `padding-inline-start` instead of `padding-left`.
- `padding-inline-end` instead of `padding-right`.
- `padding-block-start` instead of `padding-top`.
- `padding-block-end` instead of `padding-bottom`.
- `inset-inline-start` instead of `left`.
- `inset-inline-end` instead of `right`.
- `inset-block-start` instead of `top`.
- `inset-block-end` instead of `bottom`.
- and many more...

You can find the complete list of logical properties in <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values" target="_blank" rel="noreferrer">MDN</a>.

Here's how we can rewrite the widget to use logical properties.

```css
.horizontal-list {
  list-style: none;
  white-space: nowrap;
  padding: 0;
  margin: 0;

  li {
    white-space: normal;
    margin-inline-start: 50px;
    inline-size: 200px;
    display: inline-block;
    vertical-align: top;
  }

  li:first-child {
    margin-inline-start: 0;
  }
}
```

and here's how it look in LTR (Left to Right):

<div class="code-result">
  <template shadowrootmode="open">
    <style>
      .horizontal-list {
        list-style: none;
        white-space: nowrap;
        padding: 0;
        margin: 0;
        li {
          white-space: normal;
          margin-inline-start: 50px;
          inline-size: 200px;
          display: inline-block;
          vertical-align: top;
        }
        li:first-child {
          margin-inline-start: 0;
        }
      }
    </style>
    <ul class="horizontal-list">
      <li>I am text message no. 1 and I come first in the list</li>
      <li>I am text message no. 2 and I come second in the list</li>
      <li>I am text message no. 3 and I come third in the list</li>
    </ul>
  </template>
</div>

in RTL:

<div class="code-result" dir="rtl">
  <template shadowrootmode="open">
    <style>
      .horizontal-list {
        list-style: none;
        white-space: nowrap;
        padding: 0;
        margin: 0;
        li {
          white-space: normal;
          margin-inline-start: 50px;
          inline-size: 200px;
          display: inline-block;
          vertical-align: top;
        }
        li:first-child {
          margin-inline-start: 0;
        }
      }
    </style>
    <ul class="horizontal-list" dir="rtl">
      <li>I am text message no. 1 and I come first in the list</li>
      <li>I am text message no. 2 and I come second in the list</li>
      <li>I am text message no. 3 and I come third in the list</li>
    </ul>
  </template>
</div>

and in vertical RTL:

<div class="code-result">
  <template shadowrootmode="open">
    <style>
      .horizontal-list {
        list-style: none;
        white-space: nowrap;
        padding: 0;
        margin: 0;
        li {
          white-space: normal;
          margin-inline-start: 50px;
          inline-size: 200px;
          display: inline-block;
          vertical-align: top;
        }
        li:first-child {
          margin-inline-start: 0;
        }
      }
    </style>
    <ul class="horizontal-list" style="writing-mode: vertical-rl">
      <li>I am text message no. 1 and I come first in the list</li>
      <li>I am text message no. 2 and I come second in the list</li>
      <li>I am text message no. 3 and I come third in the list</li>
    </ul>
  </template>
</div>

### What about browser support ?

CSS logical properties have a pretty good cross browser support at the time of writing, so you can start using them in your projects. You can take a look at <a href="https://caniuse.com/css-logical-props" target="_blank" rel="noreferrer">caniuse</a> for a complete overview.

### What about flex and grid ?

Flex and grid support layouts in logical dimesions by default. For example, let's rewrite the widget using flex.

```css
.horizontal-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 50px;

  li {
    inline-size: 200px;
    flex-shrink: 0;
  }
}
```

Here's the result in LTR:

<div class="code-result">
  <template shadowrootmode="open">
    <style>
      .horizontal-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 50px;
        li {
          inline-size: 200px;
          flex-shrink: 0;
        }
      }
    </style>
    <ul class="horizontal-list">
      <li>I am text message no. 1 and I come first in the list</li>
      <li>I am text message no. 2 and I come second in the list</li>
      <li>I am text message no. 3 and I come third in the list</li>
    </ul>
  </template>
</div>

in RTL:

<div class="code-result" dir="rtl">
  <template shadowrootmode="open">
    <style>
      .horizontal-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 50px;
        li {
          inline-size: 200px;
          flex-shrink: 0;
        }
      }
    </style>
    <ul class="horizontal-list" dir="rtl">
      <li>I am text message no. 1 and I come first in the list</li>
      <li>I am text message no. 2 and I come second in the list</li>
      <li>I am text message no. 3 and I come third in the list</li>
    </ul>
  </template>
</div>

and in vertical RTL:

<div class="code-result">
  <template shadowrootmode="open">
    <style>
      .horizontal-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 50px;
        li {
          inline-size: 200px;
          flex-shrink: 0;
        }
      }
    </style>
    <ul class="horizontal-list" style="writing-mode: vertical-rl">
      <li>I am text message no. 1 and I come first in the list</li>
      <li>I am text message no. 2 and I come second in the list</li>
      <li>I am text message no. 3 and I come third in the list</li>
    </ul>
  </template>
</div>
