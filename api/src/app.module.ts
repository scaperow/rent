import { MaterialPropertyValueModule } from './../prisma/material-property-value/material-property-value.module';
import { ConsumptionModule } from './../prisma/consumption/consumption.module';
import { LossModule } from './../prisma/loss/loss.module';
import { DriverModule } from './../prisma/driver/driver.module';
import { AppointmentModule } from './../prisma/appointment/appointment.module';
import { ContractModule } from './../prisma/contract/contract.module';
import { OrderModule } from './../prisma/order/order.module';
import { ContractPriceModule } from './../prisma/contract-price/contract-price.module';
import { MaterialCategoryModule } from './../prisma/material-category/material-category.module';
import { MaterialModule } from './../prisma/material/material.module';
import { UnitModule } from './../prisma/unit/unit.module';
import { ProjectModule } from './../prisma/project/project.module';
import { MaterialPropertyModule } from './../prisma/material-property/material-property.module';
import { CustomerModule } from 'prisma/customer/customer.module';
import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaCrudModule } from './data-provider/index';

@Module({
  imports: [
    CustomerModule,
    MaterialPropertyModule,
    MaterialModule,
    MaterialCategoryModule,
    OrderModule,
    CustomerModule,
    ProjectModule,
    UnitModule,
    ContractModule,
    AppointmentModule,
    ContractPriceModule,
    DriverModule,
    LossModule,
    ConsumptionModule,
    MaterialPropertyValueModule,
    PrismaCrudModule.register({
      prismaService: PrismaService,
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class App1Module {}
