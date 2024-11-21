"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PrismaCrudModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCrudModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_crud_service_1 = require("./prisma-crud.service");
const access_control_module_1 = require("../access-control/access-control.module");
let PrismaCrudModule = PrismaCrudModule_1 = class PrismaCrudModule {
    static register(opts) {
        const imports = opts.accessControl
            ? [
                access_control_module_1.AccessControlModule.register({
                    authDataKey: opts.accessControl.authDataKey,
                    getRolesFromAuthDataFn: opts.accessControl.getRolesFromAuthDataFn,
                    strictMode: opts.accessControl.strict,
                }),
            ]
            : [];
        prisma_crud_service_1.PrismaCrudService.prismaClient =
            prisma_crud_service_1.PrismaCrudService.prismaClient || new opts.prismaService();
        return {
            global: true,
            module: PrismaCrudModule_1,
            imports,
            providers: [
                {
                    provide: opts.prismaService,
                    useFactory: () => prisma_crud_service_1.PrismaCrudService.prismaClient,
                },
            ],
            exports: [opts.prismaService],
        };
    }
};
PrismaCrudModule = PrismaCrudModule_1 = __decorate([
    (0, common_1.Module)({})
], PrismaCrudModule);
exports.PrismaCrudModule = PrismaCrudModule;
//# sourceMappingURL=prisma-crud.module.js.map