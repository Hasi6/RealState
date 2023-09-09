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
  areaSqFt: z.string(),
  description: z.string().nonempty(),
  image: z.string().nonempty(),
  location: z.nativeEnum(PropertyLocation),
  price: z.string(),
  slug: z.string().nonempty(),
  status: z.nativeEnum(PropertyStatus),
  title: z.string().nonempty(),
  type: z.nativeEnum(PropertyType)
});

export type LocationZ = z.infer<typeof locationZ>;

export const locationCreateSchema = z.object({
  areaSqFt: z.string().nonempty(),
  description: z.string().nonempty(),
  image: z.string().nonempty(),
  location: z.nativeEnum(PropertyLocation),
  price: z.string().nonempty(),
  slug: z.string().nonempty(),
  status: z.nativeEnum(PropertyStatus),
  title: z.string().nonempty(),
  type: z.nativeEnum(PropertyType)
});

export type LocationCreateSchema = z.infer<typeof locationCreateSchema>;
