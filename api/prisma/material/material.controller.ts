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
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { isEmpty } from 'lodash';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  async create(
    @Body() createMaterialDto: CreateMaterialDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    if (isEmpty(createMaterialDto.master)) {
      delete createMaterialDto.master;
    }
    const created = await this.materialService.create(createMaterialDto, {
      crudQuery,
    });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.materialService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.materialService.findOne(Number(id), { crudQuery });

    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    if (isEmpty(updateMaterialDto.master)) {
      delete updateMaterialDto.master;
    }
    const updated = await this.materialService.update(
      Number(id),
      updateMaterialDto,
      {
        crudQuery,
      },
    );
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.materialService.remove(id, { crudQuery });
  }
}
