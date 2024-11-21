import { Material, MaterialCategory, Unit, UnitConversion } from '.././../../prisma/src/src/schema';
export declare class CreateMaterialDto implements Material {
    id: number;
    categoryId: number;
    category: MaterialCategory;
    unitId: number;
    unit: Unit;
    count?: string;
    description?: string;
    hasVariant: boolean;
    isVariant: boolean;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    unitConversions?: UnitConversion[];
    fee?: number;
    masterId?: number;
    master?: Material;
    children?: Material[];
    disabled: boolean;
}
