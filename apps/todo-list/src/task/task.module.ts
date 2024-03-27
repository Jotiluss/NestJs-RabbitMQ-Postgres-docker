import { Module } from '@nestjs/common';
import { TasksController } from './task.controller';
import { TasksService } from './task.service';
import { TaskEntity } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from '../category/category.service';
import { CategoryEntity } from '../category/category.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, CategoryEntity]), 
    ClientsModule.register([
      {
        name: 'TODO_LIST_SERVICE', 
        transport: Transport.RMQ,
        options: {
          urls: [{
            hostname: process.env.RABBITMQ_HOST,
            password: process.env.RABBITMQ_PASS,
            username: process.env.RABBITMQ_USER,
          }],
          queue: process.env.RABBITMQ_NOTIFICATIONS_QUEUE
        }
      }
    ])
  ],
  controllers: [TasksController],
  providers: [TasksService, CategoriesService],
})
export class TaskModule {}
