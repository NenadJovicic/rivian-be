import { Injectable } from '@nestjs/common';
import { Queue } from '../entities/queue.entity';
import { AddQueueValidator } from '../validators/queue.validator';

@Injectable()
export class QueueRepository {
  public async removeFromQueue(id: string) {
    return Queue.destroy({ where: { id } });
  }

  public async getQueueForOffice(officeId: string): Promise<Queue[]> {
    return Queue.findAll({ where: { officeId }, order: [['createdAt', 'ASC']] });
  }

  public async addUserToQueue(queue: AddQueueValidator): Promise<Queue> {
    return Queue.create({ ...queue });
  }
}
