import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common';
import { TasksService } from './task.service';
import { TaskEntity } from './task.entity';
import { CreateTaskDTO, UpdateTaskDTO } from './dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks():  Promise<TaskEntity[]> {
    return this.tasksService.findAll();
  }

   @Get(':id')
  getTask(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.tasksService.findOne(id)
  }

  @Post()
  createTask(@Body() taskCreated: CreateTaskDTO): Promise<TaskEntity> {
    return this.tasksService.create(taskCreated);
  }

  @Patch(':id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() task: UpdateTaskDTO): Promise<TaskEntity> {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<{ id: number }> {
    return this.tasksService.delete(id);
  }
}
