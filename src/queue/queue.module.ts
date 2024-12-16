import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Queue } from '../entities/queue.entity';
import { QueueController } from './queue.controller';
import { QueueRepository } from './queue.repository';
import { QueueService } from './queue.service';

@Module({
  imports: [SequelizeModule.forFeature([Queue])],
  controllers: [QueueController],
  providers: [QueueService, QueueRepository],
  exports: [QueueService],
})
export class QueueModule {}
