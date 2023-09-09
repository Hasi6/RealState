import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseModule } from '@/modules/database/database.module';
import {
  PropertyDocument,
  PropertySchema
} from '@/modules/property/property.schema';
import { PropertyController } from '@/modules/property/property.controller';
import { PropertyService } from '@/modules/property/property.service';
import { PropertyRepository } from '@/modules/property/property.repository';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [forwardRef(() => ConfigModule)],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string>('JWT_EXPIRATION')}s`
        }
      }),
      inject: [ConfigService]
    }),
    DatabaseModule.forFeature([
      {
        name: PropertyDocument.name,
        schema: PropertySchema
      }
    ])
  ],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepository, ConfigService]
})
export class PropertyModule {}
