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
exports.OrderController = void 0;
const contract_service_1 = require("./../contract/contract.service");
const schema_1 = require("./../src/src/schema");
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const batch_order_dto_1 = require("./dto/batch-order.dto");
const lodash_1 = require("lodash");
const material_service_1 = require("../material/material.service");
const utils_1 = require("../../src/utils");
const moment = require('moment');
let OrderController = class OrderController {
    constructor(orderService, materialService, contractService) {
        this.orderService = orderService;
        this.materialService = materialService;
        this.contractService = contractService;
    }
    async getMaxOrder(contractId) {
        return (await this.orderService.generateNumber(contractId)) || 0;
    }
    async generateName(contractId, maxId) {
        return [
            'CO',
            String(contractId).padStart(3, '0'),
            String(maxId + 1).padStart(3, '0'),
        ].join('-');
    }
    async create(createOrderDto, crudQuery) {
        createOrderDto.name = (0, utils_1.getNumber)(utils_1.NumberName.TRANSACTION_ORDER);
        const created = await this.orderService.create(createOrderDto, {
            crudQuery,
        });
        return created;
    }
    async findMany(crudQuery) {
        const matches = await this.orderService.findMany({ crudQuery });
        return matches;
    }
    async findOne(id, crudQuery) {
        const match = await this.orderService.findOne(id, { crudQuery });
        return match;
    }
    async update(id, updateOrderDto, crudQuery) {
        const updated = await this.orderService.update(id, updateOrderDto, {
            crudQuery,
        });
        return updated;
    }
    async remove(id, crudQuery) {
        return this.orderService.remove(id, { crudQuery });
    }
    async batch(batchOrderDto, preview, crudQuery) {
        const inOrders = {};
        const outOrders = {};
        const materialIds = Object.keys(batchOrderDto.materials).map(parseInt);
        const materials = await this.materialService.findMany({
            crudQuery: {
                joins: ['unit'],
                where: {
                    id: {
                        in: materialIds,
                    },
                },
                pageSize: 999999,
            },
        });
        const contract = await this.contractService.findOne(batchOrderDto.contract.id, {
            crudQuery: {
                joins: ['customer', 'project'],
            },
        });
        const materialsMap = (0, lodash_1.reduce)(materials.data, (result, current) => {
            result[current.id] = current;
            return result;
        }, {});
        materialIds.map((materialId) => {
            const material = materialsMap[materialId];
            batchOrderDto.materials[materialId].map((transaction) => {
                const date = moment(transaction.date).format('YYYY-MM-DD');
                const flow = transaction.count < 0 ? schema_1.OrderFlow.IN : schema_1.OrderFlow.OUT;
                const pickOrders = flow === schema_1.OrderFlow.IN ? inOrders : outOrders;
                let existOrder = (0, lodash_1.get)(inOrders, date);
                if ((0, lodash_1.isEmpty)(existOrder)) {
                    existOrder = {
                        flow,
                        createdAt: transaction.date,
                        updatedAt: transaction.date,
                        materials: [],
                        status: schema_1.OrderStatus.DRAFT,
                    };
                    pickOrders[date] = existOrder;
                }
                existOrder.materials.push({
                    material: { id: material.id },
                    count: Math.abs(transaction.count),
                    unit: { id: material.unit.id },
                });
            });
        });
        if (preview) {
            return {
                contract,
                materials: materials.data,
                orders: [...Object.values(inOrders), ...Object.values(outOrders)],
            };
        }
        const allOrders = await Promise.all([...Object.values(inOrders), ...Object.values(outOrders)]
            .filter((order) => !(0, lodash_1.isEmpty)(order))
            .map(async (order) => {
            order.name = (0, utils_1.getNumber)(utils_1.NumberName.TRANSACTION_ORDER);
            order.customer = contract.customer;
            order.user = {
                id: 1,
                username: 'admin',
                email: 'scaperow@hotmail.com',
            };
            order.contract = { id: contract.id };
            order.project = { id: contract.project.id };
            order.customer = { id: contract.customer.id };
            return order;
        }));
        try {
            await order_service_1.OrderService.prismaClient.$transaction(this.orderService.createMany(allOrders, {
                crudQuery,
            }));
            return {
                count: allOrders.length,
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('batch'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('preview')),
    __param(2, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [batch_order_dto_1.BatchOrderDto, Boolean, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "batch", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        material_service_1.MaterialService,
        contract_service_1.ContractService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map