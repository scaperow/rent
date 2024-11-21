import { PrismaCrudService } from 'src/data-provider';
export declare class OrderService extends PrismaCrudService {
    constructor();
    generateNumber(contractId: number): Promise<number>;
}
