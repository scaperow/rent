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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("./customer.service");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const update_customer_dto_1 = require("./dto/update-customer.dto");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async create(createCustomerDto, crudQuery) {
        const created = await this.customerService.create(createCustomerDto, {
            crudQuery,
        });
        return created;
    }
    async findMany(crudQuery) {
        const matches = await this.customerService.findMany({ crudQuery });
        return matches;
    }
    async findOne(id, crudQuery) {
        const match = await this.customerService.findOne(id, { crudQuery });
        return match;
    }
    async update(id, updateCustomerDto, crudQuery) {
        const updated = await this.customerService.update(id, updateCustomerDto, {
            crudQuery,
        });
        return updated;
    }
    async remove(id, crudQuery) {
        return this.customerService.remove(id, { crudQuery });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto, String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_customer_dto_1.UpdateCustomerDto, String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "remove", null);
CustomerController = __decorate([
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map