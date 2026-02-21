import { defineCollection, z } from 'astro:content';

const homeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    intro_1: z.string().optional(),
    intro_2: z.string().optional(),
    intro_3: z.string().optional(),
    intro_4: z.string().optional(),
    intro_5: z.string().optional(),
    intro_6: z.string().optional(),
    intro_7: z.string().optional(),
    intro_8: z.string().optional(),
    intro_9: z.string().optional(),
    intro_10: z.string().optional(),
    intro_11: z.string().optional(),
    intro_12: z.string().optional(),
    intro_13: z.string().optional(),
    intro_14: z.string().optional(),
    intro_15: z.string().optional(),
    intro_16: z.string().optional(),
    intro_17: z.string().optional(),
  }),
});

const errorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link_text: z.string(),
  }),
});

export const collections = {
  home: homeCollection,
  errors: errorsCollection,
};
