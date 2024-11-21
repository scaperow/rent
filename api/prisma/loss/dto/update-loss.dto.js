"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLossDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_loss_dto_1 = require("./create-loss.dto");
class UpdateLossDto extends (0, mapped_types_1.PartialType)(create_loss_dto_1.CreateLossDto) {
}
exports.UpdateLossDto = UpdateLossDto;
//# sourceMappingURL=update-loss.dto.js.map