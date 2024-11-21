import { Contract } from './../../src/src/schema';
export declare class BatchOrderDto {
    materials: {
        [index: number]: [{
            count: number;
            date: Date;
        }];
    };
    contract: Contract;
}
