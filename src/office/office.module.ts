import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Office } from '../entities/office.entity';
import { OfficeController } from './office.controller';

@Module({
  imports: [SequelizeModule.forFeature([Office])],
  controllers: [OfficeController],
})
export class OfficeModule {}
