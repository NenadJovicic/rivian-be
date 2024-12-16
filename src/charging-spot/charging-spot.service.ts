import { Injectable } from '@nestjs/common';
import { ChargingSpot } from '../entities/charging-spot.entity';
import { ChargingSpotRepository } from './charging-spot.repository';

@Injectable()
export class ChargingSpotService {
  constructor(private readonly chargingSpotRepository: ChargingSpotRepository) {}

  public async getFreeChargingSpotsForOffice(officeId: string): Promise<ChargingSpot[]> {
    return this.chargingSpotRepository.getFreeChargingSpotsForOffice(officeId);
  }
}
