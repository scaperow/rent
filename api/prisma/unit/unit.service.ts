import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider';

@Injectable()
export class UnitService extends PrismaCrudService {
  constructor() {
    super({
      model: 'unit',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
