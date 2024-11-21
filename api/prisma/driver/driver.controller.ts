import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  async create(@Body() createDriverDto: CreateDriverDto, @Query('crudQuery') crudQuery: string) {
    const created = await this.driverService.create(createDriverDto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.driverService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    const match = await this.driverService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.driverService.update(id, updateDriverDto, { crudQuery });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.driverService.remove(id, { crudQuery });
  }
}
