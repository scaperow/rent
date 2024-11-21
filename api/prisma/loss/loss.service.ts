import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider/index';

@Injectable()
export class LossService extends PrismaCrudService {
  constructor() {
    super({
      model: 'loss',
      allowedJoins: ['materials', 'orderLosses', 'materialLoss'],
      defaultJoins: [],
    });
  }
}
