/* eslint-disable no-undef */
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
