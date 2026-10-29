import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    tagline: z.string(),
    domain: z.string(),
    stage: z.enum(['Concept', 'Research', 'Prototype', 'Validated', 'Deployed']),
    role: z.string(),
    stack: z.array(z.string()),
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        unit: z.string().optional(),
        source: z.string(),
        verified: z.boolean().default(true),
      })
    ),
    verification_date: z.string(),
    github: z.string().optional(),
    demo_url: z.string().optional(),
    architecture_overview: z.string(),
    constraints: z.array(z.string()).optional(),
    tradeoffs: z.array(z.string()).optional(),
  }),
});

export const collections = { projects };
