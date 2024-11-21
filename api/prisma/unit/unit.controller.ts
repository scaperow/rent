import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get('/validate-name')
  async validateName(@Query('name') name: string) {
    const { totalRecords } = await this.unitService.findMany({
      crudQuery: { where: { name: name } },
    });

    return totalRecords <= 0;
  }
  
  @Post()
  async create(
    @Body() createUnitDto: CreateUnitDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const created = await this.unitService.create(createUnitDto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.unitService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.unitService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUnitDto: UpdateUnitDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.unitService.update(id, updateUnitDto, {
      crudQuery,
    });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.unitService.remove(id, { crudQuery });
  }
}
