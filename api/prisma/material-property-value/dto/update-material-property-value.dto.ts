import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialPropertyValueDto } from './create-material-property-value.dto';

export class UpdateMaterialPropertyValueDto extends PartialType(CreateMaterialPropertyValueDto) {}
