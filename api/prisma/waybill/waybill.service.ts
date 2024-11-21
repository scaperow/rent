import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider';

@Injectable()
export class WaybillService extends PrismaCrudService {
  constructor() {
    super({
      model: 'waybill',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
