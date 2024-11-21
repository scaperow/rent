"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustMatchAuthAttribute = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../crud/utils");
const MustMatchAuthAttribute = (modelAttributePath, authDataAttributePath) => (ctx, authData, _moduleRef) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    const crudQuery = query.crudQuery;
    if (!authData) {
        throw new common_1.UnauthorizedException('This route requires user to be logged in!');
    }
    const targetValue = (0, utils_1.getNestedProperty)(authData, authDataAttributePath);
    if (!targetValue) {
        throw new common_1.InternalServerErrorException(`MustMatchAuthAttribute policy: authDataAttributePath led to falsy value.`);
    }
    const parsedCrudQuery = crudQuery ? JSON.parse(crudQuery) : {};
    const originalWhere = parsedCrudQuery.where || {};
    parsedCrudQuery.where = {
        AND: [(0, utils_1.createWhereObject)(modelAttributePath, targetValue), originalWhere],
    };
    request.query.crudQuery = JSON.stringify(parsedCrudQuery);
};
exports.MustMatchAuthAttribute = MustMatchAuthAttribute;
//# sourceMappingURL=must-match-auth-attribute.policy.js.map