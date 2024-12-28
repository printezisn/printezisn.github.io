import { glob } from 'astro/loaders';
import { z, defineCollection } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  excerpt: z.string(),
  categories: z.array(z.string()),
  date: z.date(),
});

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/posts' }),
  schema: postSchema,
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

export type Post = {
  id: string;
  data: z.infer<typeof postSchema>;
};
