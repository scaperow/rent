import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialPropertyDto } from './create-material-property.dto';

export class UpdateMaterialPropertyDto extends PartialType(CreateMaterialPropertyDto) {}
