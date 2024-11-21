import { Module } from '@nestjs/common';
import { WaybillService } from './waybill.service';
import { WaybillController } from './waybill.controller';

@Module({
  controllers: [WaybillController],
  providers: [WaybillService]
})
export class WaybillModule {}
