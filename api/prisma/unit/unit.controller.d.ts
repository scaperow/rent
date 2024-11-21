import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
export declare class UnitController {
    private readonly unitService;
    constructor(unitService: UnitService);
    validateName(name: string): Promise<boolean>;
    create(createUnitDto: CreateUnitDto, crudQuery: string): Promise<any>;
    findMany(crudQuery: string): Promise<{
        data: any;
        totalRecords: any;
        pageCount: number;
        page: number;
        pageSize: number;
        orderBy: any[];
    }>;
    findOne(id: string, crudQuery: string): Promise<any>;
    update(id: string, updateUnitDto: UpdateUnitDto, crudQuery: string): Promise<any>;
    remove(id: string, crudQuery: string): Promise<any>;
}
