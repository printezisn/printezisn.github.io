import { z, defineCollection } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  excerpt: z.string(),
  categories: z.array(z.string()),
  date: z.date(),
});

const postsCollection = defineCollection({
  type: 'content',
  schema: postSchema,
});

const gamesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    path: z.string(),
    hidden: z.boolean().optional(),
  }),
});

const otherWorkCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
  }),
});

const categoriesCollection = defineCollection({
  type: 'content',
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
  slug: string;
  data: z.infer<typeof postSchema>;
};
