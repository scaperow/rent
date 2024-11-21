import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider';

@Injectable()
export class MaterialCategoryService extends PrismaCrudService {
  constructor() {
    super({
      model: 'materialCategory',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
