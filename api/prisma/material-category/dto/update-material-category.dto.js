"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMaterialCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_material_category_dto_1 = require("./create-material-category.dto");
class UpdateMaterialCategoryDto extends (0, mapped_types_1.PartialType)(create_material_category_dto_1.CreateMaterialCategoryDto) {
}
exports.UpdateMaterialCategoryDto = UpdateMaterialCategoryDto;
//# sourceMappingURL=update-material-category.dto.js.map