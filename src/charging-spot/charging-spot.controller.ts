import { Body, Controller, Post } from '@nestjs/common';
import { ChargingSpot } from '../entities/charging-spot.entity';
import { ChargingSpotValidator } from '../validators/charging-spot.validator';

@Controller('charging-spot')
export class ChargingSpotController {
  @Post()
  public async addChargingSpot(@Body() chargingSpot: ChargingSpotValidator): Promise<ChargingSpot> {
    return ChargingSpot.create({ ...chargingSpot });
  }
}
