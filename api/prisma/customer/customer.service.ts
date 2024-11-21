import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider';

@Injectable()
export class CustomerService extends PrismaCrudService {
  constructor() {
    super({
      model: 'customer',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
