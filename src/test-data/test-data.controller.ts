import { Controller, Post } from '@nestjs/common';
import { ChargingSpot } from '../entities/charging-spot.entity';
import { Office } from '../entities/office.entity';
import { User } from '../entities/user.entity';
import { CHARGING_SPOTS, OFFICES, USERS } from './test-data';

@Controller('test-data')
export class TestDataController {
  @Post()
  public async loadTestData() {
    await Office.bulkCreate(OFFICES);
    await User.bulkCreate(USERS);
    await ChargingSpot.bulkCreate(CHARGING_SPOTS);
  }
}
