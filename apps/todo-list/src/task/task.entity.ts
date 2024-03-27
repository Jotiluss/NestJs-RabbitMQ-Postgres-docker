import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(
    () => CategoryEntity,
    (categoryEntity) => categoryEntity.tasks,
  )
  category?: CategoryEntity;
}