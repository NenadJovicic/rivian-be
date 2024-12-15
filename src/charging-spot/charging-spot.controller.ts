import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChargingSpot } from '../entities/charging-spot.entity';
import { ChargingSpotValidator } from '../validators/charging-spot.validator';

@Controller('charging-spot')
export class ChargingSpotController {
  @Post()
  public async addChargingSpot(@Body() chargingSpot: ChargingSpotValidator): Promise<ChargingSpot> {
    return ChargingSpot.create({ ...chargingSpot });
  }

  @Get('/office/:officeId')
  public async getChargingSpotsForOffice(@Param('officeId') officeId: string) {
    return ChargingSpot.findAll({ where: { officeId } });
  }
}
