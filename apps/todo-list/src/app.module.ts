import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TaskEntity } from './task/task.entity';
import { CategoryEntity } from './category/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    TaskModule,
    CategoryModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [TaskEntity, CategoryEntity]
      }),
    })
  ],
})
export class AppModule {}
