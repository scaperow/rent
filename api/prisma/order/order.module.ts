import { ContractService } from './../contract/contract.service';
import { MaterialService } from './../material/material.service';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  providers: [OrderService, MaterialService, ContractService],
})
export class OrderModule {}
