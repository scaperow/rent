import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessPolicyInterceptorOpts } from './types';
export declare class AccessPolicyInterceptor implements NestInterceptor {
    private opts;
    private moduleRef;
    private reflector;
    constructor(opts: AccessPolicyInterceptorOpts, moduleRef: ModuleRef);
    intercept(ctx: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
