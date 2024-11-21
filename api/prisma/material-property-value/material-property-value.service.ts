import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider/index';

@Injectable()
export class MaterialPropertyValueService extends PrismaCrudService {
  constructor() {
    super({
      model: 'materialPropertyValue',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
