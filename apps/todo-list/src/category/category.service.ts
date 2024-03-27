import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity) private categoriesRepository: Repository<CategoryEntity>
  ) {}

  async findAll():  Promise<CategoryEntity[]> {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    return await this.categoriesRepository.findOneBy({id})
      .then((res) => {
        if (res) return res
        throw new NotFoundException(`category id ${id} not found`)
      });
  }

  async create(categoryCreated: CreateCategoryDTO): Promise<CategoryEntity> {
    return await this.categoriesRepository.save(categoryCreated);
  }

  async update(id: number, category: UpdateCategoryDTO): Promise<CategoryEntity> {
    const newCategory = await this.categoriesRepository.preload({...category, id})
    if(!newCategory) {
      throw new NotFoundException(`category id ${id} not found`)
    }
    return await this.categoriesRepository.save(newCategory);
  }

  async delete(id: number): Promise<{ id: number }> {
    await this.categoriesRepository.delete(id)
    return { id };
  }
}
