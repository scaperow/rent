import { MaterialPropertyService } from './material-property.service';
import { CreateMaterialPropertyDto } from './dto/create-material-property.dto';
import { UpdateMaterialPropertyDto } from './dto/update-material-property.dto';
export declare class MaterialPropertyController {
    private readonly materialPropertyService;
    constructor(materialPropertyService: MaterialPropertyService);
    create(createMaterialPropertyDto: CreateMaterialPropertyDto, crudQuery: string): Promise<any>;
    findMany(crudQuery: string): Promise<{
        data: any;
        totalRecords: any;
        pageCount: number;
        page: number;
        pageSize: number;
        orderBy: any[];
    }>;
    findOne(id: string, crudQuery: string): Promise<any>;
    update(id: string, updateMaterialPropertyDto: UpdateMaterialPropertyDto, crudQuery: string): Promise<any>;
    remove(id: string, crudQuery: string): Promise<any>;
}
