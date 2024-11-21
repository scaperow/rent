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
exports.ContractController = void 0;
const common_1 = require("@nestjs/common");
const schema_1 = require("../src/src/schema");
const contract_service_1 = require("./contract.service");
const create_contract_dto_1 = require("./dto/create-contract.dto");
const update_contract_dto_1 = require("./dto/update-contract.dto");
const utils_1 = require("../../src/utils");
const client_1 = require("@prisma/client");
const order_service_1 = require("../order/order.service");
const prisma = new client_1.PrismaClient();
let ContractController = class ContractController {
    constructor(contractService, orderSerive) {
        this.contractService = contractService;
        this.orderSerive = orderSerive;
    }
    async create(createContractDto, crudQuery) {
        createContractDto.number = (0, utils_1.getNumber)(utils_1.NumberName.CONTRACT_ORDER);
        const created = await this.contractService.create(createContractDto, {
            crudQuery
        });
        return created;
    }
    async findMany(crudQuery) {
        const matches = await this.contractService.findMany({ crudQuery });
        return matches;
    }
    async findOne(id, crudQuery) {
        const match = await this.contractService.findOne(Number(id), { crudQuery });
        return match;
    }
    async update(id, updateContractDto, crudQuery) {
        const original = await this.contractService.findOne(Number(id), { crudQuery: {} });
        return await prisma.$transaction(async (tx) => {
            const newly = await this.contractService.create(Object.assign(Object.assign(Object.assign({}, original), updateContractDto), { number: (0, utils_1.getNumber)(utils_1.NumberName.CONTRACT_ORDER), reviseId: Number(id), id: undefined }), {
                crudQuery: { joins: ["revise"] },
                prismaTransaction: tx
            });
            const oldly = await this.contractService.update(Number(id), {
                status: schema_1.ContractStatus.CANCELLED
            }, {
                crudQuery: { joins: ["revise"] },
                prismaTransaction: tx
            });
            await this.orderSerive.updateMany({
                contractId: newly.id
            }, {
                crudQuery: { joins: ["revise"] },
                prismaTransaction: tx
            }, {
                contract: { id: Number(id) }
            });
            return newly;
        });
    }
    async remove(id, crudQuery) {
        return this.contractService.remove(Number(id), { crudQuery });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)("crudQuery")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contract_dto_1.CreateContractDto, String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("crudQuery")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)("crudQuery")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)("crudQuery")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contract_dto_1.UpdateContractDto, String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)("crudQuery")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "remove", null);
ContractController = __decorate([
    (0, common_1.Controller)("contract"),
    __metadata("design:paramtypes", [contract_service_1.ContractService, order_service_1.OrderService])
], ContractController);
exports.ContractController = ContractController;
//# sourceMappingURL=contract.controller.js.map