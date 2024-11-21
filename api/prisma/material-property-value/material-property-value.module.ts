import { Module } from '@nestjs/common';
import { MaterialPropertyValueService } from './material-property-value.service';
import { MaterialPropertyValueController } from './material-property-value.controller';

@Module({
  controllers: [MaterialPropertyValueController],
  providers: [MaterialPropertyValueService],
})
export class MaterialPropertyValueModule {}
