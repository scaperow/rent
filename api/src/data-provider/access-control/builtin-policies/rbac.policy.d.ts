import { ModuleRef } from '@nestjs/core';
import { AllowedRoles, AllowedRolesId, PolicyMethod } from '../types';
export declare const RBAC: <T extends AllowedRolesId = AllowedRolesId>(allowedRoles: AllowedRoles<T>, authData: any, moduleRef: ModuleRef) => PolicyMethod;
