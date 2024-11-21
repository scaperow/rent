import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MaterialCategoryService } from './material-category.service';
import { CreateMaterialCategoryDto } from './dto/create-material-category.dto';
import { UpdateMaterialCategoryDto } from './dto/update-material-category.dto';

@Controller('material-category')
export class MaterialCategoryController {
  constructor(private readonly materialCategoryService: MaterialCategoryService) {}

  @Post()
  async create(@Body() createMaterialCategoryDto: CreateMaterialCategoryDto, @Query('crudQuery') crudQuery: string) {
    const created = await this.materialCategoryService.create(createMaterialCategoryDto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.materialCategoryService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    const match = await this.materialCategoryService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMaterialCategoryDto: UpdateMaterialCategoryDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.materialCategoryService.update(id, updateMaterialCategoryDto, { crudQuery });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.materialCategoryService.remove(id, { crudQuery });
  }
}
