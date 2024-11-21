import { MaterialCategoryService } from './material-category.service';
import { CreateMaterialCategoryDto } from './dto/create-material-category.dto';
import { UpdateMaterialCategoryDto } from './dto/update-material-category.dto';
export declare class MaterialCategoryController {
    private readonly materialCategoryService;
    constructor(materialCategoryService: MaterialCategoryService);
    create(createMaterialCategoryDto: CreateMaterialCategoryDto, crudQuery: string): Promise<any>;
    findMany(crudQuery: string): Promise<{
        data: any;
        totalRecords: any;
        pageCount: number;
        page: number;
        pageSize: number;
        orderBy: any[];
    }>;
    findOne(id: string, crudQuery: string): Promise<any>;
    update(id: string, updateMaterialCategoryDto: UpdateMaterialCategoryDto, crudQuery: string): Promise<any>;
    remove(id: string, crudQuery: string): Promise<any>;
}
