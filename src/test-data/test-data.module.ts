import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChargingSpot } from '../entities/charging-spot.entity';
import { Office } from '../entities/office.entity';
import { User } from '../entities/user.entity';
import { TestDataController } from './test-data.controller';

@Module({
  controllers: [TestDataController],
  imports: [SequelizeModule.forFeature([ChargingSpot, User, Office])],
})
export class TestDataModule {}
