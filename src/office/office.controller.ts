import { Body, Controller, Post } from '@nestjs/common';
import { Office } from '../entities/office.entity';
import { OfficeValidator } from '../validators/office.validator';

@Controller('office')
export class OfficeController {
  @Post()
  /**
   * Skipping whole architecture of controller/service/repository, because this is just to add some test data.
   */
  async addOffice(@Body() office: OfficeValidator): Promise<Office> {
    return Office.create({ ...office });
  }
}
