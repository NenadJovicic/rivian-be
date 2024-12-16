import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from '../entities/queue.entity';
import { AddQueueValidator } from '../validators/queue.validator';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  public async addToQueue(@Body() body: AddQueueValidator): Promise<Queue> {
    return Queue.create({ ...body });
  }
}
