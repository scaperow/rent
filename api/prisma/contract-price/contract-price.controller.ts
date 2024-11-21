import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContractPriceService } from './contract-price.service';
import { CreateContractPriceDto } from './dto/create-contract-price.dto';
import { UpdateContractPriceDto } from './dto/update-contract-price.dto';

@Controller('contract-price')
export class ContractPriceController {
  constructor(private readonly contractPriceService: ContractPriceService) {}

  @Post()
  async create(@Body() createContractPriceDto: CreateContractPriceDto, @Query('crudQuery') crudQuery: string) {
    const created = await this.contractPriceService.create(createContractPriceDto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.contractPriceService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    const match = await this.contractPriceService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContractPriceDto: UpdateContractPriceDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.contractPriceService.update(id, updateContractPriceDto, { crudQuery });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.contractPriceService.remove(id, { crudQuery });
  }
}
