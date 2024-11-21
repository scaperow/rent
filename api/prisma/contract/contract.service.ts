import { Injectable } from '@nestjs/common';
import { prisma } from '@prisma/client';
import { PrismaCrudService } from 'src/data-provider';

@Injectable()
export class ContractService extends PrismaCrudService {
  constructor() {
    super({
      model: 'contract',
      allowedJoins: [
        'customer',
        'project',
        'appointments',
        'orders',
        'orders.materials',
        'prices',
        'prices.material',
        'revise',
      ],
      defaultJoins: [],
    });
  }
}
