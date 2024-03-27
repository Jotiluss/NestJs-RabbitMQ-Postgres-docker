import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO, UpdateTaskDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from '../category/category.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity) private tasksRepository: Repository<TaskEntity>,
    private categoriesService: CategoriesService,
    @Inject('TODO_LIST_SERVICE') private rabbitClient: ClientProxy
  ) {}

  async findAll():  Promise<TaskEntity[]> {
    return await this.tasksRepository.find({relations: {category: true}});
  }

  async findOne(id: number): Promise<TaskEntity> {
    return await this.tasksRepository.findOne({where: {id}, relations: {category: true}})
      .then((res) => {
        if (res) return res
        throw new NotFoundException(`task id ${id} not found`)
      });
  }

  async create(taskCreated: CreateTaskDTO): Promise<TaskEntity> {
    const newTask = taskCreated
    if(newTask.category && !newTask.category.id) {
      newTask.category = await this.categoriesService.create(newTask.category)
    }
    return this.tasksRepository.save(newTask).then((res) => {
      this.rabbitClient.emit('task-created', res)
      return res
    });
  }

  async update(id: number, task: UpdateTaskDTO): Promise<TaskEntity> {
    const newTask = await this.tasksRepository.preload({...task, id})
    if(!newTask) {
      throw new NotFoundException(`task id ${id} not found`)
    }
    if(newTask.category && !newTask.category.id) {
      newTask.category = await this.categoriesService.create(newTask.category)
    }
    return await this.tasksRepository.save(newTask).then((res) => {
      this.rabbitClient.emit('task-updated', res)
      return res
    });
  }

  async delete(id: number): Promise<{ id: number }> {
    return await this.tasksRepository.delete(id).then(() => {
      this.rabbitClient.emit('task-deleted', {id})
      return {id} 
    })
  }
}
