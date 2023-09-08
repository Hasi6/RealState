import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

import { AbstractRepository } from '@/modules/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '@/modules/user/user.schema';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  constructor(
    @InjectModel(UserDocument.name)
    userModule: Model<UserDocument>
  ) {
    super(userModule);
  }
}
