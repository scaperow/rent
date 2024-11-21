import { MaterialPropertyValueService } from './material-property-value.service';
import { CreateMaterialPropertyValueDto } from './dto/create-material-property-value.dto';
import { UpdateMaterialPropertyValueDto } from './dto/update-material-property-value.dto';
export declare class MaterialPropertyValueController {
    private readonly materialPropertyValueService;
    constructor(materialPropertyValueService: MaterialPropertyValueService);
    create(createMaterialPropertyValueDto: CreateMaterialPropertyValueDto, crudQuery: string): Promise<any>;
    findMany(crudQuery: string): Promise<{
        data: any;
        totalRecords: any;
        pageCount: number;
        page: number;
        pageSize: number;
        orderBy: any[];
    }>;
    findOne(id: string, crudQuery: string): Promise<any>;
    update(id: string, updateMaterialPropertyValueDto: UpdateMaterialPropertyValueDto, crudQuery: string): Promise<any>;
    remove(id: string, crudQuery: string): Promise<any>;
}
