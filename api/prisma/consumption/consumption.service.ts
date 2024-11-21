import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider';

@Injectable()
export class ConsumptionService extends PrismaCrudService {
  constructor() {
    super({
      model: 'consumption',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
