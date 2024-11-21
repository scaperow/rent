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
import { MaterialPropertyService } from './material-property.service';
import { CreateMaterialPropertyDto } from './dto/create-material-property.dto';
import { UpdateMaterialPropertyDto } from './dto/update-material-property.dto';

@Controller('material-property')
export class MaterialPropertyController {
  constructor(
    private readonly materialPropertyService: MaterialPropertyService,
  ) {}

  @Post()
  async create(
    @Body() createMaterialPropertyDto: CreateMaterialPropertyDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const created = await this.materialPropertyService.create(
      createMaterialPropertyDto,
      { crudQuery },
    );
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.materialPropertyService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.materialPropertyService.findOne(Number(id), {
      crudQuery,
    });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMaterialPropertyDto: UpdateMaterialPropertyDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.materialPropertyService.update(
      Number(id),
      updateMaterialPropertyDto,
      { crudQuery },
    );
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.materialPropertyService.remove(Number(id), { crudQuery });
  }
}
