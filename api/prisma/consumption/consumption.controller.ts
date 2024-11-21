import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { UpdateConsumptionDto } from './dto/update-consumption.dto';

@Controller('consumption')
export class ConsumptionController {
  constructor(private readonly consumptionService: ConsumptionService) {}

  @Post()
  async create(@Body() createConsumptionDto: CreateConsumptionDto, @Query('crudQuery') crudQuery: string) {
    const created = await this.consumptionService.create(createConsumptionDto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.consumptionService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    const match = await this.consumptionService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConsumptionDto: UpdateConsumptionDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.consumptionService.update(id, updateConsumptionDto, { crudQuery });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.consumptionService.remove(id, { crudQuery });
  }
}
