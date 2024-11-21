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
import { MaterialPropertyValueService } from './material-property-value.service';
import { CreateMaterialPropertyValueDto } from './dto/create-material-property-value.dto';
import { UpdateMaterialPropertyValueDto } from './dto/update-material-property-value.dto';

@Controller('material-property-value')
export class MaterialPropertyValueController {
  constructor(
    private readonly materialPropertyValueService: MaterialPropertyValueService,
  ) {}

  @Post()
  async create(
    @Body() createMaterialPropertyValueDto: CreateMaterialPropertyValueDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const created = await this.materialPropertyValueService.create(
      createMaterialPropertyValueDto,
      { crudQuery },
    );
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.materialPropertyValueService.findMany({
      crudQuery,
    });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.materialPropertyValueService.findOne(id, {
      crudQuery,
    });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMaterialPropertyValueDto: UpdateMaterialPropertyValueDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.materialPropertyValueService.update(
      id,
      updateMaterialPropertyValueDto,
      { crudQuery },
    );
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.materialPropertyValueService.remove(id, { crudQuery });
  }
}
