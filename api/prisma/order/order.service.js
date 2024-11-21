"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OrderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const data_provider_1 = require("../../src/data-provider");
let OrderService = OrderService_1 = class OrderService extends data_provider_1.PrismaCrudService {
    constructor() {
        super({
            model: 'order',
            allowedJoins: [
                'contract',
                'materials',
                'materials.material',
                'materials.unit',
                'materials.unit.id',
                'project',
                'customer',
                'user',
            ],
            defaultJoins: [],
        });
    }
    async generateNumber(contractId) {
        return await OrderService_1.prismaClient.order.count({
            where: {
                contract: {
                    id: contractId,
                },
            },
        });
    }
};
OrderService = OrderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map