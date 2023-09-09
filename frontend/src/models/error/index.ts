import { z } from 'zod';

export const errorAttributes = z.object({
  field: z.string().optional(),
  message: z.string(),
});

export type ErrorZ = z.infer<typeof errorAttributes>;
