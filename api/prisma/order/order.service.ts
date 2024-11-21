import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'src/data-provider';

@Injectable()
export class OrderService extends PrismaCrudService {
  constructor() {
    super({
      model: 'order',
      allowedJoins: [
        'contract',
        'materials',
        'materials.material',
        'materials.unit',
        'materials.unit.id',
        'project',
        'customer',
        'user',
      ],
      defaultJoins: [],
    });
  }

  async generateNumber(contractId: number) {
    return await OrderService.prismaClient.order.count({
      where: {
        contract: {
          id: contractId,
        },
      },
    });
  }
}
