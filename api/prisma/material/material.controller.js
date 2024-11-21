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
exports.MaterialController = void 0;
const common_1 = require("@nestjs/common");
const material_service_1 = require("./material.service");
const create_material_dto_1 = require("./dto/create-material.dto");
const update_material_dto_1 = require("./dto/update-material.dto");
const lodash_1 = require("lodash");
let MaterialController = class MaterialController {
    constructor(materialService) {
        this.materialService = materialService;
    }
    async create(createMaterialDto, crudQuery) {
        if ((0, lodash_1.isEmpty)(createMaterialDto.master)) {
            delete createMaterialDto.master;
        }
        const created = await this.materialService.create(createMaterialDto, {
            crudQuery,
        });
        return created;
    }
    async findMany(crudQuery) {
        const matches = await this.materialService.findMany({ crudQuery });
        return matches;
    }
    async findOne(id, crudQuery) {
        const match = await this.materialService.findOne(Number(id), { crudQuery });
        return match;
    }
    async update(id, updateMaterialDto, crudQuery) {
        if ((0, lodash_1.isEmpty)(updateMaterialDto.master)) {
            delete updateMaterialDto.master;
        }
        const updated = await this.materialService.update(Number(id), updateMaterialDto, {
            crudQuery,
        });
        return updated;
    }
    async remove(id, crudQuery) {
        return this.materialService.remove(id, { crudQuery });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_material_dto_1.CreateMaterialDto, String]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_material_dto_1.UpdateMaterialDto, String]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "remove", null);
MaterialController = __decorate([
    (0, common_1.Controller)('material'),
    __metadata("design:paramtypes", [material_service_1.MaterialService])
], MaterialController);
exports.MaterialController = MaterialController;
//# sourceMappingURL=material.controller.js.map