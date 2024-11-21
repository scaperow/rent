"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWaybillDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_waybill_dto_1 = require("./create-waybill.dto");
class UpdateWaybillDto extends (0, mapped_types_1.PartialType)(create_waybill_dto_1.CreateWaybillDto) {
}
exports.UpdateWaybillDto = UpdateWaybillDto;
//# sourceMappingURL=update-waybill.dto.js.map