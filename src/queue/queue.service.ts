import { Injectable } from '@nestjs/common';
import { Queue } from '../entities/queue.entity';
import { AddQueueValidator } from '../validators/queue.validator';
import { QueueRepository } from './queue.repository';

@Injectable()
export class QueueService {
  constructor(private readonly queueRepo: QueueRepository) {}

  public async getQueueForOffice(officeId: string): Promise<Queue[]> {
    return this.queueRepo.getQueueForOffice(officeId);
  }

  public async addUserToQueue(queue: AddQueueValidator): Promise<Queue> {
    return this.queueRepo.addUserToQueue(queue);
  }

  public async removeFromQueue(id: string) {
    return this.queueRepo.removeFromQueue(id);
  }
}
