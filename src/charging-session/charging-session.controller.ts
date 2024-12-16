import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ChargingSession } from '../entities/charging-session.entity';
import { StartChargingSessionValidator } from '../validators/charging-session.validator';
import { ChargingSessionService } from './charging-session.service';

@Controller('charging-session')
export class ChargingSessionController {
  constructor(private readonly chargingSessionService: ChargingSessionService) {}

  @Post()
  public async startCharging(@Body() body: StartChargingSessionValidator): Promise<ChargingSession | null> {
    return this.chargingSessionService.startCharging(body);
  }

  @Patch(':sessionId')
  public async stopCharging(@Param('sessionId') sessionId: string) {
    return this.chargingSessionService.stopChargingAndAddNextFromQueue(sessionId);
  }
}
