"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialPropertyModule = void 0;
const common_1 = require("@nestjs/common");
const material_property_service_1 = require("./material-property.service");
const material_property_controller_1 = require("./material-property.controller");
let MaterialPropertyModule = class MaterialPropertyModule {
};
MaterialPropertyModule = __decorate([
    (0, common_1.Module)({
        controllers: [material_property_controller_1.MaterialPropertyController],
        providers: [material_property_service_1.MaterialPropertyService],
    })
], MaterialPropertyModule);
exports.MaterialPropertyModule = MaterialPropertyModule;
//# sourceMappingURL=material-property.module.js.map