import { Test, TestingModule } from '@nestjs/testing';
import { ContractPriceController } from './contract-price.controller';
import { ContractPriceService } from './contract-price.service';

describe('ContractPriceController', () => {
  let controller: ContractPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractPriceController],
      providers: [ContractPriceService],
    }).compile();

    controller = module.get<ContractPriceController>(ContractPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
