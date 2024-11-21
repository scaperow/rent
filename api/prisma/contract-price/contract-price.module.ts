import { Module } from '@nestjs/common';
import { ContractPriceService } from './contract-price.service';
import { ContractPriceController } from './contract-price.controller';

@Module({
  controllers: [ContractPriceController],
  providers: [ContractPriceService]
})
export class ContractPriceModule {}
