import { DynamicModule } from '@nestjs/common';
import { PrismaCrudModuleOpts } from './types';
export declare class PrismaCrudModule {
    static register(opts: PrismaCrudModuleOpts): DynamicModule;
}
