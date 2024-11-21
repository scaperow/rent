import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto, @Query('crudQuery') crudQuery: string) {
    const created = await this.appointmentService.create(createAppointmentDto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.appointmentService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    const match = await this.appointmentService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.appointmentService.update(id, updateAppointmentDto, { crudQuery });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.appointmentService.remove(id, { crudQuery });
  }
}
