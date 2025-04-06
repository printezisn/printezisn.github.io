import { glob } from 'astro/loaders';
import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      excerpt: z.string(),
      categories: z.array(z.string()),
      date: z.date(),
      image: z
        .object({
          href: image(),
          alt: z.string(),
        })
        .optional(),
    }),
});

const gamesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/games' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    path: z.string(),
    hidden: z.boolean().optional(),
  }),
});

const otherWorkCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/other-work' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    order: z.number(),
  }),
});

const categoriesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/categories' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  posts: postsCollection,
  games: gamesCollection,
  'other-work': otherWorkCollection,
  categories: categoriesCollection,
};
