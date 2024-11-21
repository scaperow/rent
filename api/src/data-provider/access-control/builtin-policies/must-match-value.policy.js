"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustMatchValue = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../crud/utils");
const MustMatchValue = (modelAttributePath, targetValue) => (ctx, _authData, _moduleRef) => {
    if (!targetValue) {
        throw new common_1.InternalServerErrorException(`MustMatchValue policy: targetValue may not be a falsy value.`);
    }
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    const crudQuery = query.crudQuery;
    const parsedCrudQuery = crudQuery ? JSON.parse(crudQuery) : {};
    const originalWhere = parsedCrudQuery.where || {};
    parsedCrudQuery.where = {
        AND: [(0, utils_1.createWhereObject)(modelAttributePath, targetValue), originalWhere],
    };
    request.query.crudQuery = JSON.stringify(parsedCrudQuery);
};
exports.MustMatchValue = MustMatchValue;
//# sourceMappingURL=must-match-value.policy.js.map