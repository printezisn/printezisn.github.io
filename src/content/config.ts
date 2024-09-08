import { z, defineCollection } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  excerpt: z.string(),
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

export const collections = {
  posts: postsCollection,
  games: gamesCollection,
  'other-work': otherWorkCollection,
};

export type Post = {
  slug: string;
  data: z.infer<typeof postSchema>;
};
