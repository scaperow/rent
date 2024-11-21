"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App1Module = void 0;
const material_property_value_module_1 = require("./../prisma/material-property-value/material-property-value.module");
const consumption_module_1 = require("./../prisma/consumption/consumption.module");
const loss_module_1 = require("./../prisma/loss/loss.module");
const driver_module_1 = require("./../prisma/driver/driver.module");
const appointment_module_1 = require("./../prisma/appointment/appointment.module");
const contract_module_1 = require("./../prisma/contract/contract.module");
const order_module_1 = require("./../prisma/order/order.module");
const material_category_module_1 = require("./../prisma/material-category/material-category.module");
const material_module_1 = require("./../prisma/material/material.module");
const unit_module_1 = require("./../prisma/unit/unit.module");
const project_module_1 = require("./../prisma/project/project.module");
const material_property_module_1 = require("./../prisma/material-property/material-property.module");
const customer_module_1 = require("../prisma/customer/customer.module");
const prisma_service_1 = require("./prisma.service");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const index_1 = require("./data-provider/index");
let App1Module = class App1Module {
};
App1Module = __decorate([
    (0, common_1.Module)({
        imports: [
            customer_module_1.CustomerModule,
            material_property_module_1.MaterialPropertyModule,
            material_module_1.MaterialModule,
            material_category_module_1.MaterialCategoryModule,
            order_module_1.OrderModule,
            customer_module_1.CustomerModule,
            project_module_1.ProjectModule,
            unit_module_1.UnitModule,
            contract_module_1.ContractModule,
            appointment_module_1.AppointmentModule,
            driver_module_1.DriverModule,
            loss_module_1.LossModule,
            consumption_module_1.ConsumptionModule,
            material_property_value_module_1.MaterialPropertyValueModule,
            index_1.PrismaCrudModule.register({
                prismaService: prisma_service_1.PrismaService,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [prisma_service_1.PrismaService, app_service_1.AppService],
    })
], App1Module);
exports.App1Module = App1Module;
//# sourceMappingURL=app.module.js.map