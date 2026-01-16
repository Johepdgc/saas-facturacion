import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller(':companyId/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll(@Param('companyId') companyId: string) {
    return this.inventoryService.findAll(companyId);
  }

  @Post()
  create(@Param('companyId') companyId: string, @Body() data: any) {
    return this.inventoryService.create(companyId, data);
  }

  @Put(':id')
  update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() data: any,
  ) {
    return this.inventoryService.update(companyId, id, data);
  }

  @Delete(':id')
  remove(@Param('companyId') companyId: string, @Param('id') id: string) {
    return this.inventoryService.remove(companyId, id);
  }
}
