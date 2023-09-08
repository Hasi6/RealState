import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/modules/database/database.module';
import { UserDocument, UserSchema } from '@/modules/user/user.schema';
import { UserService } from '@/modules/user/user.service';
import { UserRepository } from '@/modules/user/user.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema
      }
    ])
  ],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository]
})
export class UserModule {}
