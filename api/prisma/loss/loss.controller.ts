import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LossService } from './loss.service';
import { CreateLossDto } from './dto/create-loss.dto';
import { UpdateLossDto } from './dto/update-loss.dto';

@Controller('loss')
export class LossController {
  constructor(private readonly lossService: LossService) {}

  @Post()
  async create(@Body() createLossDto: CreateLossDto, @Query('crudQuery') crudQuery: string) {
    const created = await this.lossService.create(createLossDto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.lossService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    const match = await this.lossService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLossDto: UpdateLossDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.lossService.update(id, updateLossDto, { crudQuery });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.lossService.remove(id, { crudQuery });
  }
}
