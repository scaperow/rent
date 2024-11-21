import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider';

@Injectable()
export class MaterialService extends PrismaCrudService {
  constructor() {
    super({
      model: 'material',
      allowedJoins: [
        'properties',
        'units',
        'category',
        'master',
        'unit',
        'children',
        'children.unit',
        'units.unit',
        'properties.materialProperty',
        'properties.materialProperty.unit',
        'properties.propertyValue',
      ],
      defaultJoins: [],
    });
  }
}
