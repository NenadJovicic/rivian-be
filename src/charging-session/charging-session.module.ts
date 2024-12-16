import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChargingSpotModule } from '../charging-spot/charging-spot.module';
import { ChargingSession } from '../entities/charging-session.entity';
import { QueueModule } from '../queue/queue.module';
import { ChargingSessionController } from './charging-session.controller';
import { ChargingSessionRepository } from './charging-session.repository';
import { ChargingSessionService } from './charging-session.service';

@Module({
  imports: [SequelizeModule.forFeature([ChargingSession]), QueueModule, ChargingSpotModule],
  controllers: [ChargingSessionController],
  providers: [ChargingSessionRepository, ChargingSessionService],
})
export class ChargingSessionModule {}
