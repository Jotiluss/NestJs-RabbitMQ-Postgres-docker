import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { CategoryEntity } from './category.entity';
import { UpdateCategoryDTO, CreateCategoryDTO } from './dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories():  Promise<CategoryEntity[]> {
    return this.categoriesService.findAll();
  }

   @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number): Promise<CategoryEntity> {
    return this.categoriesService.findOne(id);
  }

  @Post()
  createCategory(@Body() categoryCreated: CreateCategoryDTO): Promise<CategoryEntity> {
    return this.categoriesService.create(categoryCreated);
  }

  @Patch(':id')
  updateCategory(@Param('id', ParseIntPipe) id: number, @Body() category: UpdateCategoryDTO): Promise<CategoryEntity> {
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<{ id: number }> {
    return this.categoriesService.delete(id);
  }
}
