import { Body, Controller, Post } from '@nestjs/common';
import { OfficeValidator } from '../dto/office.validator';
import { Office } from '../entities/office.entity';

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
