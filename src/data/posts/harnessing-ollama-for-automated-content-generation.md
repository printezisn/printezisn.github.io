---
title: Harnessing Ollama for Automated Content Generation with AI
description: Discover how to use Ollama, a local AI model runner, to automate content generation, editing, optimization tasks and how to streamline your workflow.
excerpt: Learn how to harness the power of Ollama, a local AI model runner, to automate content generation, editing, and optimization tasks. Explore the possibilities of using AI to streamline your workflow and discover new ideas for automating tasks.
categories:
  - ai
date: 2025-06-09
lastUpdate: 2025-06-09
image:
  href: ../../assets/posts/harnessing-ollama-for-automated-content-generation/assistant.png
  alt: A software engineer along with his robot assistant
---

I'm one of the people who never jumped on the AI trend train. Don't get me wrong, I'm using AI tools in my daily life. I'm using Midjourney for image generation, Canva for image editing software, and ChatGPT for any questions that come to my mind (once I asked about the power levels of every DBZ hero on Namek). However, I never thought of starting an AI startup 😂

One thing I never liked was having to use an external API and paying for tokens. Also, it's something that I wouldn't be able to use if I needed to provide private data. That changed recently when I discovered Ollama, and I decided to give it a try.

### What is Ollama?

<a href="https://ollama.com/" target="_blank" rel="noreferrer nofollow">Ollama</a> is a local AI model runner, allowing users to run large language models (LLMs) directly on their personal computers, rather than relying on cloud-based services. This means I can make as many requests as I want, without spending any money or sharing my data.

### Project Idea

I found the best way to try out Ollama was by working on a fun project. Typically, after I finish writing a blog post, I need to review it for syntax errors. Additionally, I need to write a title, create a description for the blog portal, and craft a suitable meta description for search engine optimization (SEO). Initially, this task may seem easy, but it can be quite tedious. This is something I wanted to automate 💡

### Installing Ollama and Choosing a Model

My first move was to install Ollama by following the instructions in its <a href="https://github.com/ollama/ollama" target="_blank" rel="noreferrer nofollow">GitHub page</a> and installing Meta's Llama3.2 model for use.

```shell
ollama run llama3.2
```

After this step, I had a very enjoyable conversation.

```
>>> Hello my friend
It's nice to meet you! Is there something I can help you with, or would you like to chat for a bit?

>>> Are you ready to code to our heart's content?
I'm more than ready to get coding with you. What programming language are you in the mood for today? Python, JavaScript, C++, or something else?

Also, do you have a specific project in mind or are we going to come up with something on the fly? Let me know and we can start coding!

>>> Get your API ready cause I'll be sending tons of requests
Bring it on!

I've got an empty API endpoint waiting for your requests. What kind of data will you be sending? JSON, XML, or something else?

Also, just to confirm, are we using a simulated environment or is this going to be a real API call?

Type away, and I'll catch everything!
```

### Script Writing

Now that everything's ready, I still need to figure out the right prompts and write a script.

````js title="sanitize-post.js"
import fs from 'fs';
import path from 'path';

if (!process.argv[2]) {
  console.error('No post provided');
  process.exit(1);
}

const filePath = path.join(import.meta.dirname, process.argv[2]);
if (!fs.existsSync(filePath)) {
  console.error('The post you provided does not exist');
  process.exit(1);
}

const originalFileContent = fs.readFileSync(filePath).toString().trim();
let finalFileContent = originalFileContent;

const fixTypos = async (finalFileContent) => {
  const postContent = finalFileContent
    .slice(finalFileContent.indexOf('---', 4) + 3)
    .replace(/```(.*?)```/gs, '')
    .replace(/<(.*?)>/gs, '');

  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3.2',
      stream: false,
      format: {
        type: 'object',
        properties: {
          phrases: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                original: {
                  type: 'string',
                },
                fixed: {
                  type: 'string',
                },
              },
              required: ['original', 'fixed'],
            },
          },
        },
        required: ['phrases'],
      },
      prompt: `
      Can you please fix typos in the following blog post, written in markdown ?
      Please give me pairs of original phrase and the updated phrase after the fixes are applied.

      ${postContent}
    `,
    }),
  });

  const result = await response.json();
  const { phrases } = JSON.parse(result.response);

  phrases.forEach(({ original, fixed }) => {
    finalFileContent = finalFileContent.replace(original, fixed);
  });

  return finalFileContent;
};

const generateMeta = async (finalFileContent) => {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3.2',
      stream: false,
      format: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
          },
          metaDescription: {
            type: 'string',
          },
          excerpt: {
            type: 'string',
          },
        },
        required: ['title', 'metaDescription', 'excerpt'],
      },
      prompt: `
      Based on the following blog post, can you generate the following ?
      1. A title of up to 60 characters.
      2. A meta description between 150 and 160 characters, used for SEO.
      3. An excerpt of at least 150 characters.

      The blog post is the following:

      ${finalFileContent}
    `,
    }),
  });

  const result = await response.json();
  const { title, metaDescription, excerpt } = JSON.parse(result.response);

  return finalFileContent
    .replace(/title:(.*)/, `title: ${title}`)
    .replace(/description:(.*)/, `description: ${metaDescription}`)
    .replace(/excerpt:(.*)/, `excerpt: ${excerpt}`);
};

while (true) {
  finalFileContent = originalFileContent;
  finalFileContent = await fixTypos(finalFileContent);
  finalFileContent = await generateMeta(finalFileContent);

  console.log(finalFileContent);
  console.log();
  console.log('Happy? (y/n)');
  console.log();

  const reply = await new Promise((resolve) => {
    process.stdin.on('data', (data) => {
      resolve(data?.toString().trim().toLowerCase() === 'y');
    });
  });

  if (reply) {
    fs.writeFileSync(filePath, finalFileContent);
    process.exit(0);
  }

  console.log();
  console.log('Trying again...');
  console.log();
}
````

With everything set up, I'm now ready to review my blog posts 😂

### Conclusion

Working with Ollama was a delightful experience! and this experience has opened the door to exploring other exciting ideas, such as automating test generation. Now to answer the million dollar question, no, AI is not yet capable of replacing engineers, including junior engineers, however, AI can still serve as an excellent tool for handling mundane and time-consuming tasks.
