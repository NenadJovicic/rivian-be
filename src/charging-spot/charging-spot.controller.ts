import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChargingSpot } from '../entities/charging-spot.entity';
import { ChargingSpotValidator } from '../validators/charging-spot.validator';
import { ChargingSpotService } from './charging-spot.service';

@Controller('charging-spot')
export class ChargingSpotController {
  constructor(private readonly chargingSpotService: ChargingSpotService) {}

  @Post()
  public async addChargingSpot(@Body() chargingSpot: ChargingSpotValidator): Promise<ChargingSpot> {
    return ChargingSpot.create({ ...chargingSpot });
  }

  @Get('/office/:officeId')
  public async getChargingSpotsForOffice(@Param('officeId') officeId: string) {
    return ChargingSpot.findAll({ where: { officeId } });
  }

  @Get('free-spots-for-office/:officeId')
  public async getFreeChargingSpotsForOffice(@Param('officeId') officeId: string): Promise<ChargingSpot[]> {
    return this.chargingSpotService.getFreeChargingSpotsForOffice(officeId);
  }
}
