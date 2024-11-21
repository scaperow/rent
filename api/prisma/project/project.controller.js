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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async create(createProjectDto, crudQuery) {
        const created = await this.projectService.create(createProjectDto, {
            crudQuery,
        });
        return created;
    }
    async findMany(crudQuery) {
        const matches = await this.projectService.findMany({ crudQuery });
        return matches;
    }
    async findOne(id, crudQuery) {
        const match = await this.projectService.findOne(id, { crudQuery });
        return match;
    }
    async update(id, updateProjectDto, crudQuery) {
        const updated = await this.projectService.update(id, updateProjectDto, {
            crudQuery,
        });
        return updated;
    }
    async remove(id, crudQuery) {
        return this.projectService.remove(id, { crudQuery });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('crudQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "remove", null);
ProjectController = __decorate([
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map