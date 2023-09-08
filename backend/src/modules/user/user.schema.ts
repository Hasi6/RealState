import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument } from '@/modules/database/abstract.schema';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'user'
})
export class UserDocument extends AbstractDocument {
  @Prop({
    unique: true
  })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
