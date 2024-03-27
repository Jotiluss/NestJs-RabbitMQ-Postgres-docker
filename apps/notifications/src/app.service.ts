import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  async createTask(data) {
    this.logger.debug(`La tache "${data.text}" à été créé sous l'identifiant ${data.id}${data.category ? ` dans la catégorie "${data.category.name}"` : ''}\n`);
  }

  async updateTask(data) {
    this.logger.debug(`La tache "${data.text}" sous l'identifiant ${data.id}${data.category ? ` dans la catégorie "${data.category.name}"` : ''} à été modifié \n`);
  }

  async deleteTask(data) {
    this.logger.debug(`La tache sous l'identifiant ${data.id} à été supprimé\n`);
  }
}
