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
exports.AccessPolicyInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const builtin_policies_1 = require("./builtin-policies");
const constants_1 = require("./constants");
let AccessPolicyInterceptor = class AccessPolicyInterceptor {
    constructor(opts, moduleRef) {
        this.opts = opts;
        this.moduleRef = moduleRef;
        this.reflector = new core_1.Reflector();
    }
    async intercept(ctx, next) {
        const policyConfigs = this.reflector.getAllAndOverride(constants_1.POLICY_KEY, [
            ctx.getHandler(),
            ctx.getClass(),
        ]);
        if (!(policyConfigs === null || policyConfigs === void 0 ? void 0 : policyConfigs.length)) {
            if (this.opts.strictMode) {
                throw new common_1.NotImplementedException('AccessPolicy: policies not implemented!');
            }
            else {
                return next.handle();
            }
        }
        const request = ctx.switchToHttp().getRequest();
        const authData = request[this.opts.authDataKey];
        const policies = [
            (0, builtin_policies_1.RBAC)(policyConfigs[0], authData, this.moduleRef),
            ...policyConfigs.slice(1),
        ];
        for (let i = 0; i < policies.length; i++) {
            const policy = policies[i];
            await policy(ctx, authData, this.moduleRef);
        }
        return next.handle();
    }
};
AccessPolicyInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.ACCESS_POLICY_OPTS_KEY)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => core_1.ModuleRef))),
    __metadata("design:paramtypes", [Object, core_1.ModuleRef])
], AccessPolicyInterceptor);
exports.AccessPolicyInterceptor = AccessPolicyInterceptor;
//# sourceMappingURL=access-policy.interceptor.js.map