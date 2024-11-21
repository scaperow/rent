"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessPolicy = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const AccessPolicy = (...policyConfigs) => (0, common_1.SetMetadata)(constants_1.POLICY_KEY, policyConfigs);
exports.AccessPolicy = AccessPolicy;
//# sourceMappingURL=access-policy.decorator.js.map