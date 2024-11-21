import { ExecutionContext } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
export declare type AllowedRoles<T extends AllowedRolesId = AllowedRolesId> = 'everyone' | 'anyRole' | T;
export declare type PolicyMethod = (ctx: ExecutionContext, authData: any, moduleRef: ModuleRef) => void | any;
export declare type AccessPolicyConfig = [AllowedRoles, ...PolicyMethod[]];
export interface AccessPolicyInterceptorOpts {
    authDataKey: string;
    getRolesFromAuthDataFn: GetRolesFunction;
    strictMode: boolean;
}
export declare type AllowedRolesId = string[] | number[] | Set<string> | Set<number>;
export declare type GetRolesReturnType = AllowedRolesId;
export declare type GetRolesFunction = (request: any) => GetRolesReturnType;
