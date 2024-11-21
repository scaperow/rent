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
exports.MaterialPropertyController = void 0;
const common_1 = require("@nestjs/common");
const material_property_service_1 = require("./material-property.service");
const create_material_property_dto_1 = require("./dto/create-material-property.dto");
const update_material_property_dto_1 = require("./dto/update-material-property.dto");
let MaterialPropertyController = class MaterialPropertyController {
    constructor(materialPropertyService) {
        this.materialPropertyService = materialPropertyService;
    }
    async create(createMaterialPropertyDto, crudQuery) {
        const created = await this.materialPropertyService.create(createMaterialPropertyDto, { crudQuery });
        return created;
    }
    async findMany(crudQuery) {
        const matches = await this.materialPropertyService.findMany({ crudQuery });
        return matches;
    }
    async findOne(id, crudQuery) {
        const match = await this.materialPropertyService.findOne(Number(id), {
            crudQuery,
        });
        return match;
    }
    async update(id, updateMaterialPropertyDto, crudQuery) {
        const updated = await this.materialPropertyService.update(Number(id), updateMaterialPropertyDto, { crudQuery });
        return updated;
    }
    async remove(id, crudQuery) {
        return this.materialPropertyService.remove(Number(id), { crudQuery });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_material_property_dto_1.CreateMaterialPropertyDto, String]),
    __metadata("design:returntype", Promise)
], MaterialPropertyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialPropertyController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MaterialPropertyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_material_property_dto_1.UpdateMaterialPropertyDto, String]),
    __metadata("design:returntype", Promise)
], MaterialPropertyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MaterialPropertyController.prototype, "remove", null);
MaterialPropertyController = __decorate([
    (0, common_1.Controller)('material-property'),
    __metadata("design:paramtypes", [material_property_service_1.MaterialPropertyService])
], MaterialPropertyController);
exports.MaterialPropertyController = MaterialPropertyController;
//# sourceMappingURL=material-property.controller.js.map