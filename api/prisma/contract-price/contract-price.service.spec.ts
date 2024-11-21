import { Test, TestingModule } from '@nestjs/testing';
import { ContractPriceService } from './contract-price.service';

describe('ContractPriceService', () => {
  let service: ContractPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractPriceService],
    }).compile();

    service = module.get<ContractPriceService>(ContractPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
