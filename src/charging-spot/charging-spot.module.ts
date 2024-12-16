import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChargingSpot } from '../entities/charging-spot.entity';
import { ChargingSpotController } from './charging-spot.controller';
import { ChargingSpotRepository } from './charging-spot.repository';
import { ChargingSpotService } from './charging-spot.service';

@Module({
  imports: [SequelizeModule.forFeature([ChargingSpot])],
  providers: [ChargingSpotService, ChargingSpotRepository],
  controllers: [ChargingSpotController],
  exports: [ChargingSpotService],
})
export class ChargingSpotModule {}
