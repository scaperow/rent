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
exports.MaterialPropertyValueController = void 0;
const common_1 = require("@nestjs/common");
const material_property_value_service_1 = require("./material-property-value.service");
const create_material_property_value_dto_1 = require("./dto/create-material-property-value.dto");
const update_material_property_value_dto_1 = require("./dto/update-material-property-value.dto");
let MaterialPropertyValueController = class MaterialPropertyValueController {
    constructor(materialPropertyValueService) {
        this.materialPropertyValueService = materialPropertyValueService;
    }
    async create(createMaterialPropertyValueDto, crudQuery) {
        const created = await this.materialPropertyValueService.create(createMaterialPropertyValueDto, { crudQuery });
        return created;
    }
    async findMany(crudQuery) {
        const matches = await this.materialPropertyValueService.findMany({
            crudQuery,
        });
        return matches;
    }
    async findOne(id, crudQuery) {
        const match = await this.materialPropertyValueService.findOne(id, {
            crudQuery,
        });
        return match;
    }
    async update(id, updateMaterialPropertyValueDto, crudQuery) {
        const updated = await this.materialPropertyValueService.update(id, updateMaterialPropertyValueDto, { crudQuery });
        return updated;
    }
    async remove(id, crudQuery) {
        return this.materialPropertyValueService.remove(id, { crudQuery });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_material_property_value_dto_1.CreateMaterialPropertyValueDto, String]),
    __metadata("design:returntype", Promise)
], MaterialPropertyValueController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialPropertyValueController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MaterialPropertyValueController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_material_property_value_dto_1.UpdateMaterialPropertyValueDto, String]),
    __metadata("design:returntype", Promise)
], MaterialPropertyValueController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MaterialPropertyValueController.prototype, "remove", null);
MaterialPropertyValueController = __decorate([
    (0, common_1.Controller)('material-property-value'),
    __metadata("design:paramtypes", [material_property_value_service_1.MaterialPropertyValueService])
], MaterialPropertyValueController);
exports.MaterialPropertyValueController = MaterialPropertyValueController;
//# sourceMappingURL=material-property-value.controller.js.map