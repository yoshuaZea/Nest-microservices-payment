import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Payments-ms');
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: envs.nats_servers, // * It is an array
      },
    },
    {
      inheritAppConfig: true, // * Enable to use dto for hybrid API (REST & MICROSERVICE)
    },
  );

  await app.startAllMicroservices();

  await app.listen(envs.port);
  logger.log(`Payment microservice running on port ${envs.port}`);
}
bootstrap();
