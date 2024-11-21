import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider';

@Injectable()
export class ContractPriceService extends PrismaCrudService {
  constructor() {
    super({
      model: 'contractPrice',
      allowedJoins: ['material', 'material.unit', 'contract'],
      defaultJoins: [],
    });
  }
}
