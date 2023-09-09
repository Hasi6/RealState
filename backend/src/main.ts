import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from '@/app.module';
import { AppClusterService } from '@/services/cluster/cluster.service';
import { CustomExceptionFilter } from '@/utils/exception/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const config = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.useGlobalFilters(new CustomExceptionFilter());
  app.enableCors({ origin: 'http://localhost:3000' });
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints).join(' \n ')
        }));
        return new BadRequestException({ errors: formattedErrors });
      }
    })
  );

  await app.listen(port, () => {
    new Logger().log(`[SERVER]: ${config.get<string>('PORT')}`);
  });
}

if (process.env.MODE === 'DEV') {
  bootstrap();
} else {
  AppClusterService.clusterize(bootstrap);
}
