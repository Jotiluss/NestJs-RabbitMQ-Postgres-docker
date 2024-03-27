import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryEntity } from '../../category/category.entity';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  category?: CategoryEntity;
}