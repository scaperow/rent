import { ContractService } from "./contract.service";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";
import { OrderService } from "../order/order.service";
export declare class ContractController {
    private readonly contractService;
    private readonly orderSerive;
    constructor(contractService: ContractService, orderSerive: OrderService);
    create(createContractDto: CreateContractDto, crudQuery: string): Promise<any>;
    findMany(crudQuery: string): Promise<{
        data: any;
        totalRecords: any;
        pageCount: number;
        page: number;
        pageSize: number;
        orderBy: any[];
    }>;
    findOne(id: string, crudQuery: string): Promise<any>;
    update(id: string, updateContractDto: UpdateContractDto, crudQuery: string): Promise<any>;
    remove(id: string, crudQuery: string): Promise<any>;
}
