import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseModule } from '@/modules/database/database.module';
import {
  LocationDocument,
  LocationSchema
} from '@/modules/location/location.schema';
import { LocationController } from '@/modules/location/location.controller';
import { LocationService } from '@/modules/location/location.service';
import { LocationRepository } from '@/modules/location/location.repository';
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
        name: LocationDocument.name,
        schema: LocationSchema
      }
    ])
  ],
  controllers: [LocationController],
  providers: [LocationService, LocationRepository, ConfigService]
})
export class LocationModule {}
