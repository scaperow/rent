"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaybillModule = void 0;
const common_1 = require("@nestjs/common");
const waybill_service_1 = require("./waybill.service");
const waybill_controller_1 = require("./waybill.controller");
let WaybillModule = class WaybillModule {
};
WaybillModule = __decorate([
    (0, common_1.Module)({
        controllers: [waybill_controller_1.WaybillController],
        providers: [waybill_service_1.WaybillService]
    })
], WaybillModule);
exports.WaybillModule = WaybillModule;
//# sourceMappingURL=waybill.module.js.map