import { z } from 'zod';

export enum PropertyLocation {
  Colombo = 'Colombo',
  Kandy = 'Kandy',
  Galle = 'Galle'
}

export enum PropertyType {
  SingleFamily = 'Single Family',
  Villa = 'Villa'
}

export enum PropertyStatus {
  Sale = 'Sale',
  Rent = 'Rent'
}

export const locationZ = z.object({
  _id: z.string().nonempty(),
  areaSqFt: z.number(),
  description: z.string().nonempty(),
  image: z.string().nonempty(),
  location: z.nativeEnum(PropertyLocation),
  price: z.number(),
  slug: z.string().nonempty(),
  status: z.nativeEnum(PropertyStatus),
  title: z.string().nonempty(),
  type: z.nativeEnum(PropertyType)
});

export type LocationZ = z.infer<typeof locationZ>;
