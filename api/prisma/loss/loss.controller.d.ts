import { LossService } from './loss.service';
import { CreateLossDto } from './dto/create-loss.dto';
import { UpdateLossDto } from './dto/update-loss.dto';
export declare class LossController {
    private readonly lossService;
    constructor(lossService: LossService);
    create(createLossDto: CreateLossDto, crudQuery: string): Promise<any>;
    findMany(crudQuery: string): Promise<{
        data: any;
        totalRecords: any;
        pageCount: number;
        page: number;
        pageSize: number;
        orderBy: any[];
    }>;
    findOne(id: string, crudQuery: string): Promise<any>;
    update(id: string, updateLossDto: UpdateLossDto, crudQuery: string): Promise<any>;
    remove(id: string, crudQuery: string): Promise<any>;
}
