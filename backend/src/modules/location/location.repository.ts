import { Injectable } from '@nestjs/common';

import { AbstractRepository } from '@/modules/database/abstract.repository';
import { LocationDocument } from '@/modules/location/location.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LocationRepository extends AbstractRepository<LocationDocument> {
  constructor(
    @InjectModel(LocationDocument.name)
    locationModule: Model<LocationDocument>
  ) {
    super(locationModule);
  }
}
