import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider';

@Injectable()
export class ProjectService extends PrismaCrudService {
  constructor() {
    super({
      model: 'project',
      allowedJoins: ['customer'],
      defaultJoins: [],
    });
  }
}
