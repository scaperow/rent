import { Module } from '@nestjs/common';
import { MaterialPropertyService } from './material-property.service';
import { MaterialPropertyController } from './material-property.controller';

@Module({
  controllers: [MaterialPropertyController],
  providers: [MaterialPropertyService],
})
export class MaterialPropertyModule {}
