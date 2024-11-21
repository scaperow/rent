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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const created = await this.customerService.create(createCustomerDto, {
      crudQuery,
    });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.customerService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.customerService.findOne(id, { crudQuery });

    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.customerService.update(id, updateCustomerDto, {
      crudQuery,
    });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.customerService.remove(id, { crudQuery });
  }
}
