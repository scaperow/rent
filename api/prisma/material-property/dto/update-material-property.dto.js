"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMaterialPropertyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_material_property_dto_1 = require("./create-material-property.dto");
class UpdateMaterialPropertyDto extends (0, mapped_types_1.PartialType)(create_material_property_dto_1.CreateMaterialPropertyDto) {
}
exports.UpdateMaterialPropertyDto = UpdateMaterialPropertyDto;
//# sourceMappingURL=update-material-property.dto.js.map