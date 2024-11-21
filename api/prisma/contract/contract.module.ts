import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from "./contract.controller";
import { OrderService } from "../order/order.service";

@Module({
  controllers: [ContractController],
  providers: [ContractService, OrderService]
})
export class ContractModule {
}
