import { BadRequestException, Injectable } from '@nestjs/common';
import { ChargingSpotService } from '../charging-spot/charging-spot.service';
import { ChargingSession } from '../entities/charging-session.entity';
import { Queue } from '../entities/queue.entity';
import { QueueService } from '../queue/queue.service';
import { StartChargingSessionValidator } from '../validators/charging-session.validator';
import { ChargingSessionRepository } from './charging-session.repository';

@Injectable()
export class ChargingSessionService {
  constructor(
    private readonly chargingSessionRepository: ChargingSessionRepository,
    private readonly queueService: QueueService,
    private readonly chargingSpotService: ChargingSpotService,
  ) {}

  /**
   *
   * @param session data for charging sesion
   * @returns if `null` is returned, it means user is added to queue, else, it will return current charging session
   */
  public async startCharging(session: StartChargingSessionValidator): Promise<ChargingSession | null> {
    const freeSpots = await this.chargingSpotService.getFreeChargingSpotsForOffice(session.officeId);
    if (freeSpots[0]) {
      return this.chargingSessionRepository.startCharging({ userId: session.userId, spotId: freeSpots[0].id });
    } else {
      const res = await this.freeUpSlotUsedForLongerThan4Hours(session.officeId);
      if (!res) await this.addUserToQueue(session);
    }
  }

  private async addUserToQueue(session: StartChargingSessionValidator) {
    try {
      await this.queueService.addUserToQueue({ userId: session.userId, officeId: session.officeId });
      console.log('USER ADDED TO QUEUE');
    } catch (error) {
      console.error(error);
      // normally, if error occurs, it means that unique constraint is broken
      // TODO: here should be added error check
      throw new BadRequestException('You are already in queue for charging spot');
    }
  }

  public async stopChargingAndAddNextFromQueue(sessionId: string) {
    await this.chargingSessionRepository.stopCharging(sessionId);
    const endedSession = await this.chargingSessionRepository.findById(sessionId);
    const queueForOffice = await this.queueService.getQueueForOffice(endedSession.spot?.officeId);
    if (queueForOffice.length) {
      return this.startChargingSessionForUserInQueue(queueForOffice[0]);
    }
  }

  private async startChargingSessionForUserInQueue(queue: Queue) {
    const session = await this.startCharging({ officeId: queue.officeId, userId: queue.userId });
    if (session) {
      this.queueService.removeFromQueue(queue.id);
    }
  }

  /**
   *
   * @param officeId office for which user applied for charging spot
   * @returns indicator is some charging spot freed up because it was used for more than 4 hours
   */
  private async freeUpSlotUsedForLongerThan4Hours(officeId: string): Promise<boolean> {
    const activeSessionsForOffice = await this.chargingSessionRepository.findActiveSesssionsForOfficeLongerThan4Hours(officeId);
    if (activeSessionsForOffice.length) {
      await this.stopChargingAndAddNextFromQueue(activeSessionsForOffice[0].id);
      return true;
    }
    return false;
  }
}
