import { DynamicModule } from '@nestjs/common';
import { AccessPolicyInterceptorOpts } from './types';
export declare class AccessControlModule {
    static register(opts: AccessPolicyInterceptorOpts): DynamicModule;
}
