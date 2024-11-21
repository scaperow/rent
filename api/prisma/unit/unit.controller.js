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
exports.UnitController = void 0;
const common_1 = require("@nestjs/common");
const unit_service_1 = require("./unit.service");
const create_unit_dto_1 = require("./dto/create-unit.dto");
const update_unit_dto_1 = require("./dto/update-unit.dto");
let UnitController = class UnitController {
    constructor(unitService) {
        this.unitService = unitService;
    }
    async validateName(name) {
        const { totalRecords } = await this.unitService.findMany({
            crudQuery: { where: { name: name } },
        });
        return totalRecords <= 0;
    }
    async create(createUnitDto, crudQuery) {
        const created = await this.unitService.create(createUnitDto, { crudQuery });
        return created;
    }
    async findMany(crudQuery) {
        const matches = await this.unitService.findMany({ crudQuery });
        return matches;
    }
    async findOne(id, crudQuery) {
        const match = await this.unitService.findOne(id, { crudQuery });
        return match;
    }
    async update(id, updateUnitDto, crudQuery) {
        const updated = await this.unitService.update(id, updateUnitDto, {
            crudQuery,
        });
        return updated;
    }
    async remove(id, crudQuery) {
        return this.unitService.remove(id, { crudQuery });
    }
};
__decorate([
    (0, common_1.Get)('/validate-name'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "validateName", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_unit_dto_1.CreateUnitDto, String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_unit_dto_1.UpdateUnitDto, String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "remove", null);
UnitController = __decorate([
    (0, common_1.Controller)('unit'),
    __metadata("design:paramtypes", [unit_service_1.UnitService])
], UnitController);
exports.UnitController = UnitController;
//# sourceMappingURL=unit.controller.js.map