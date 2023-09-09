import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/modules/database/abstract.repository';
import { PropertyDocument } from '@/modules/property/property.schema';

@Injectable()
export class PropertyRepository extends AbstractRepository<PropertyDocument> {
  constructor(
    @InjectModel(PropertyDocument.name)
    propertyModule: Model<PropertyDocument>
  ) {
    super(propertyModule);
  }
}
