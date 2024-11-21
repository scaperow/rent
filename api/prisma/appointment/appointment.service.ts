import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider';

@Injectable()
export class AppointmentService extends PrismaCrudService {
  constructor() {
    super({
      model: 'appointment',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
