import { ContractService } from './../contract/contract.service';
import { Order } from './../src/src/schema';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { BatchOrderDto } from './dto/batch-order.dto';
import { MaterialService } from 'prisma/material/material.service';
export declare class OrderController {
    private readonly orderService;
    private readonly materialService;
    private readonly contractService;
    constructor(orderService: OrderService, materialService: MaterialService, contractService: ContractService);
    getMaxOrder(contractId: number): Promise<number>;
    generateName(contractId: number, maxId: number): Promise<string>;
    create(createOrderDto: CreateOrderDto, crudQuery: string): Promise<any>;
    findMany(crudQuery: string): Promise<{
        data: any;
        totalRecords: any;
        pageCount: number;
        page: number;
        pageSize: number;
        orderBy: any[];
    }>;
    findOne(id: string, crudQuery: string): Promise<any>;
    update(id: string, updateOrderDto: UpdateOrderDto, crudQuery: string): Promise<any>;
    remove(id: string, crudQuery: string): Promise<any>;
    batch(batchOrderDto: BatchOrderDto, preview: boolean, crudQuery: string): Promise<{
        contract: any;
        materials: any;
        orders: Partial<Order>[];
        count?: undefined;
    } | {
        count: number;
        contract?: undefined;
        materials?: undefined;
        orders?: undefined;
    }>;
}
