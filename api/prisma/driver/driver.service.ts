import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider';

@Injectable()
export class DriverService extends PrismaCrudService {
  constructor() {
    super({
      model: 'driver',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
