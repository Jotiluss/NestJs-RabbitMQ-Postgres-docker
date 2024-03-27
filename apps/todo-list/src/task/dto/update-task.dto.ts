import { IsOptional, IsString } from 'class-validator';
import { CategoryEntity } from '../../category/category.entity';

export class UpdateTaskDTO {
  @IsString()
  @IsOptional()
  text: string;

  @IsOptional()
  category?: CategoryEntity;
}