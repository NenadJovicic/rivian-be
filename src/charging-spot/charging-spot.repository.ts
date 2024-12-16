import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { ChargingSession } from '../entities/charging-session.entity';
import { ChargingSpot } from '../entities/charging-spot.entity';

@Injectable()
export class ChargingSpotRepository {
  public async getFreeChargingSpotsForOffice(officeId: string): Promise<ChargingSpot[]> {
    return ChargingSpot.findAll({
      include: [
        {
          model: ChargingSession,
          where: {
            endTime: {
              [Op.is]: null,
            },
          },
          required: false,
        },
      ],
      where: {
        officeId,
        '$chargingSessions.id$': { [Op.is]: null },
      },
    });
  }
}
