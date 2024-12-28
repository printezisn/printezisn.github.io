---
title: Introduction to CSS logical properties
description: Explore how CSS logical properties enhance web layouts for various languages, simplifying globalization and improving user experience.
excerpt: In this post, we explore the importance of CSS logical properties for creating web layouts that adapt to a variety of languages. Through a practical example, we demonstrate how traditional CSS can complicate globalization efforts, particularly for languages that read right-to-left or top-to-bottom. By transitioning to CSS logical properties, we simplify our stylesheets and ensure a seamless user experience across diverse languages and writing modes.
categories:
  - css
date: 2024-10-25
---

Before we delve into what CSS logical properties are, let’s start with a practical example. Imagine we are creating a simple horizontal list of text messages:

```html
<ul class="horizontal-list">
  <li>I am text message no. 1 and I come first in the list</li>
  <li>I am text message no. 2 and I come second in the list</li>
  <li>I am text message no. 3 and I come third in the list</li>
</ul>
```

We use CSS to style the list and each message:

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

The result is a neatly displayed horizontal list:

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

### Preparing for Globalization

Now, let’s assume the widget becomes so popular that we want to create versions in other languages. While translating to Spanish or French is straightforward, what about Arabic, which is written right-to-left (RTL)? Simply adding a `dir="rtl"` attribute should address this, but let’s see the outcome:

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

Notice something odd? There’s no margin between the first and second messages, but there is between the second and third. This occurs because of our `margin-left` rule, which needs to change to `margin-right` for RTL languages.

To fix this, we can add an RTL-specific CSS rule:

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

Now, it looks much better!

---

### Expanding to Other Languages

With the widget’s success, we’re now releasing it in several Asian countries, some of which have scripts that flow top-to-bottom and right-to-left. This means we need to convert `margin-left` to `margin-top` and `width` to `height`.

Our CSS now includes:

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

We’ve achieved the desired layout in all cases, but our CSS has become increasingly complex, requiring many additional rules. Imagine doing this for every element in a large project! This is where CSS logical properties come into play.

---

### Introducing CSS Logical Properties

Traditional CSS properties define layout using physical dimensions. For instance, `width` denotes horizontal size, `height` denotes vertical size and `margin-left` specifies the left margin. In contrast, CSS logical properties define layout based on the logical flow of the content. For instance, `inline-size` denotes the size of the element in the dimension which is parallel to the flow of text, `block-size` denotes the size in the dimension perpendicular to the flow of text, etc.

Here are some common logical properties:

- `inline-size` instead of `width`
- `block-size` instead of `height`
- `margin-inline-start` instead of `margin-left`
- `margin-inline-end` instead of `margin-right`
- `margin-block-start` instead of `margin-top`
- `margin-block-end` instead of `margin-bottom`
- `padding-inline-start` instead of `padding-left`
- `padding-inline-end` instead of `padding-right`
- `padding-block-start` instead of `padding-top`
- `padding-block-end` instead of `padding-bottom`
- `inset-inline-start` instead of `left`
- `inset-inline-end` instead of `right`
- `inset-block-start` instead of `top`
- `inset-block-end` instead of `bottom`
- ...and many more

You can find the full list of logical properties on <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values" target="_blank" rel="noreferrer">MDN</a>.

Here’s how we can refactor our widget to use logical properties:

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

This setup works seamlessly in different text directions:

**LTR (Left-to-Right)**:

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

**RTL (Right-to-Left)**:

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

**Vertical RTL**:

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

### Browser Support

CSS logical properties boast good cross-browser support, so you can confidently implement them in your projects. For detailed compatibility, check <a href="https://caniuse.com/css-logical-props" target="_blank" rel="noreferrer">caniuse</a>.

### Flexbox and Grid with Logical Properties

Both Flexbox and Grid layouts inherently support logical dimensions. Here’s how we can rewrite our widget using Flexbox:

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

The output remains consistent across text directions, making it easier to maintain a responsive design.

In conclusion, leveraging CSS logical properties simplifies the process of creating layouts that adapt to different languages and writing modes, enhancing both your code’s maintainability and your website’s global accessibility.
