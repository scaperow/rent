import { ConsumptionService } from './consumption.service';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { UpdateConsumptionDto } from './dto/update-consumption.dto';
export declare class ConsumptionController {
    private readonly consumptionService;
    constructor(consumptionService: ConsumptionService);
    create(createConsumptionDto: CreateConsumptionDto, crudQuery: string): Promise<any>;
    findMany(crudQuery: string): Promise<{
        data: any;
        totalRecords: any;
        pageCount: number;
        page: number;
        pageSize: number;
        orderBy: any[];
    }>;
    findOne(id: string, crudQuery: string): Promise<any>;
    update(id: string, updateConsumptionDto: UpdateConsumptionDto, crudQuery: string): Promise<any>;
    remove(id: string, crudQuery: string): Promise<any>;
}
