import { WaybillService } from './waybill.service';
import { CreateWaybillDto } from './dto/create-waybill.dto';
import { UpdateWaybillDto } from './dto/update-waybill.dto';
export declare class WaybillController {
    private readonly waybillService;
    constructor(waybillService: WaybillService);
    create(createWaybillDto: CreateWaybillDto, crudQuery: string): Promise<any>;
    findMany(crudQuery: string): Promise<{
        data: any;
        totalRecords: any;
        pageCount: number;
        page: number;
        pageSize: number;
        orderBy: any[];
    }>;
    findOne(id: string, crudQuery: string): Promise<any>;
    update(id: string, updateWaybillDto: UpdateWaybillDto, crudQuery: string): Promise<any>;
    remove(id: string, crudQuery: string): Promise<any>;
}
