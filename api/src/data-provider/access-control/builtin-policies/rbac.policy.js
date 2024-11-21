"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBAC = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const RBAC = (allowedRoles, authData, moduleRef) => (_) => {
    if (allowedRoles === 'everyone') {
        return;
    }
    if (!authData) {
        throw new common_1.UnauthorizedException();
    }
    const accessPolicyInterceptorOpts = moduleRef.get(constants_1.ACCESS_POLICY_OPTS_KEY, { strict: false });
    const { getRolesFromAuthDataFn } = accessPolicyInterceptorOpts;
    const userRoles = getRolesFromAuthDataFn(authData);
    const userRolesSet = new Set(userRoles);
    if (!userRolesSet.size) {
        throw new common_1.ForbiddenException(`User's roles do not grant access to the requested resource.`);
    }
    if (allowedRoles === 'anyRole') {
        return;
    }
    const userRolesArray = Array.from(userRolesSet);
    const allowedRolesSet = new Set(allowedRoles);
    for (let i = 0; i < userRolesArray.length; i++) {
        const role = userRolesArray[i];
        if (allowedRolesSet.has(role)) {
            return;
        }
    }
    throw new common_1.ForbiddenException(`User's roles do not grant access to the requested resource.`);
};
exports.RBAC = RBAC;
//# sourceMappingURL=rbac.policy.js.map