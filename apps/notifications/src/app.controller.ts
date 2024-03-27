import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern("task-created")
  handleTaskCreated(@Payload() data):  void {
    this.appService.createTask(data)
  }

  @EventPattern("task-updated")
  handleTaskUpdated(@Payload() data):  void {
    this.appService.updateTask(data)
  }

  @EventPattern("task-deleted")
  handleTaskDeleted(@Payload() data):  void {
    this.appService.deleteTask(data)
  }
}
