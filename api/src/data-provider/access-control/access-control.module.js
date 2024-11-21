"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AccessControlModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControlModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("./constants");
const access_policy_interceptor_1 = require("./access-policy.interceptor");
let AccessControlModule = AccessControlModule_1 = class AccessControlModule {
    static register(opts) {
        return {
            global: true,
            module: AccessControlModule_1,
            providers: [
                {
                    provide: constants_1.ACCESS_POLICY_OPTS_KEY,
                    useValue: opts,
                },
                access_policy_interceptor_1.AccessPolicyInterceptor,
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: access_policy_interceptor_1.AccessPolicyInterceptor,
                },
            ],
            exports: [access_policy_interceptor_1.AccessPolicyInterceptor, constants_1.ACCESS_POLICY_OPTS_KEY],
        };
    }
};
AccessControlModule = AccessControlModule_1 = __decorate([
    (0, common_1.Module)({})
], AccessControlModule);
exports.AccessControlModule = AccessControlModule;
//# sourceMappingURL=access-control.module.js.map