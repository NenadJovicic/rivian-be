import { Injectable } from '@nestjs/common';
import { col, Op, where } from 'sequelize';
import { ChargingSession } from '../entities/charging-session.entity';
import { ChargingSpot } from '../entities/charging-spot.entity';

const fourHoursInMilliseconds = 4 * 60 * 60 * 1000;

@Injectable()
export class ChargingSessionRepository {
  public async findActiveForUser(userId: string) {
    return ChargingSession.scope('withSpot').findOne({
      where: { userId, endTime: null },
    });
  }

  public async startCharging(session: Pick<ChargingSession, 'spotId' | 'userId'>): Promise<ChargingSession> {
    const newSession = await ChargingSession.create({ ...session });
    return this.findById(newSession.id);
  }

  public async findActiveSesssionsForOfficeLongerThan4Hours(officeId: string): Promise<ChargingSession[]> {
    return ChargingSession.findAll({
      include: ChargingSpot,
      // where: [where(col('spot.office_id'), officeId), where(col('end_time'), null), where(col('start_time'), [Op.gte])],
      where: {
        [Op.and]: [
          {
            endTime: null,
            startTime: {
              [Op.lte]: new Date(Date.now() - fourHoursInMilliseconds),
            },
          },
          where(col('spot.office_id'), officeId),
        ],
      },
      order: [['startTime', 'ASC']],
    });
  }

  public async stopCharging(sessionId: string) {
    return ChargingSession.update(
      {
        endTime: new Date(),
      },
      { where: { id: sessionId } },
    );
  }

  public async findById(id: string): Promise<ChargingSession> {
    return ChargingSession.scope('withSpot').findByPk(id);
  }
}
