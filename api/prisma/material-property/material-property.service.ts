import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider';

@Injectable()
export class MaterialPropertyService extends PrismaCrudService {
  constructor() {
    super({
      model: 'materialProperty',
      allowedJoins: ['unit', 'predefineds'],
      defaultJoins: [],
    });
  }
}
