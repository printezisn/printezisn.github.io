import { glob } from 'astro/loaders';
import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      excerpt: z.string(),
      categories: z.array(z.string()),
      date: z.date(),
      lastUpdate: z.date(),
      image: z
        .object({
          href: image(),
          alt: z.string(),
        })
        .optional(),
    }),
});

const gamesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/games' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    path: z.string(),
    date: z.date(),
  }),
});

const otherWorkCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/other-work' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    date: z.date(),
  }),
});

const cvProfileCollection = defineCollection({
  loader: glob({ pattern: 'profile.md', base: './src/data/cv' }),
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    location: z.string(),
    email: z.string(),
    website: z.string(),
    github: z.string(),
    linkedin: z.string(),
    lastUpdate: z.date(),
    skills: z.array(
      z.object({ label: z.string(), items: z.array(z.string()) }),
    ),
    education: z.array(
      z.object({
        degree: z.string(),
        school: z.string(),
        year: z.coerce.string(),
      }),
    ),
    languages: z.array(z.object({ name: z.string(), level: z.string() })),
  }),
});

const cvExperienceCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/cv/experience' }),
  schema: z.object({
    title: z.string(),
    company: z.string().optional(),
    location: z.string().optional(),
    startDate: z.date(),
    endDate: z.date().optional(),
    // Overrides the period generated from the dates (e.g. "2010 – 2014").
    period: z.string().optional(),
    stack: z.array(z.string()).optional(),
  }),
});

const cvProjectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/cv/projects' }),
  schema: z.object({
    name: z.string(),
    url: z.string(),
    order: z.number(),
    stack: z.array(z.string()),
  }),
});

const categoriesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/categories' }),
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
  'cv-profile': cvProfileCollection,
  'cv-experience': cvExperienceCollection,
  'cv-projects': cvProjectsCollection,
};
