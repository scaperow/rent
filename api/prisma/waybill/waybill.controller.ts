import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WaybillService } from './waybill.service';
import { CreateWaybillDto } from './dto/create-waybill.dto';
import { UpdateWaybillDto } from './dto/update-waybill.dto';

@Controller('waybill')
export class WaybillController {
  constructor(private readonly waybillService: WaybillService) {}

  @Post()
  async create(@Body() createWaybillDto: CreateWaybillDto, @Query('crudQuery') crudQuery: string) {
    const created = await this.waybillService.create(createWaybillDto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.waybillService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    const match = await this.waybillService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWaybillDto: UpdateWaybillDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.waybillService.update(id, updateWaybillDto, { crudQuery });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.waybillService.remove(id, { crudQuery });
  }
}
