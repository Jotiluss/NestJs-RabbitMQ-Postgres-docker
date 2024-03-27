import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    { 
      transport: Transport.RMQ,
      options: {
        urls: [{
          hostname: process.env.RABBITMQ_HOST,
          password: process.env.RABBITMQ_PASS,
          username: process.env.RABBITMQ_USER,
          port: parseInt(process.env.RABBITMQ_PORT),
        }],
        queue: process.env.RABBITMQ_NOTIFICATIONS_QUEUE
      } 
    }
  );
  await app.listen();
}
bootstrap();
