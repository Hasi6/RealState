import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument } from '@/modules/database/abstract.schema';

export enum PropertyType {
  SingleFamily = 'Single Family',
  Villa = 'Villa'
}

export enum PropertyStatus {
  Sale = 'Sale',
  Rent = 'Rent'
}

export enum PropertyLocation {
  Colombo = 'Colombo',
  Kandy = 'Kandy',
  Galle = 'Galle'
}

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'location'
})
export class LocationDocument extends AbstractDocument {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  slug: string;

  @Prop({
    type: String,
    enum: Object.values(PropertyLocation)
  })
  location: PropertyLocation;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({
    type: String,
    enum: Object.values(PropertyType)
  })
  type: PropertyType;

  @Prop({
    type: String,
    enum: Object.values(PropertyStatus)
  })
  status: PropertyStatus;

  @Prop()
  areaSqFt: number;
}

export const LocationSchema = SchemaFactory.createForClass(LocationDocument);
