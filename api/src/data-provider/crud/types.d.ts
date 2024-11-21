import { PrismaClient } from '@prisma/client';
import { GetRolesFunction } from '../access-control/types';
export declare type PaginationConfig = {
    defaultPageSize?: number;
    maxPageSize?: number;
    defaultOrderBy?: {
        [key: string]: 'asc' | 'desc';
    }[];
};
export declare type CrudQueryObj = {
    where?: CrudWhere;
    joins?: string[];
    select?: {
        only?: string[];
        except?: string[];
    };
    orderBy?: any[];
    page?: number;
    pageSize?: number;
};
export declare type CrudQueryFull = Required<CrudQueryObj>;
export declare type CrudQuery = CrudQueryObj | string | null | undefined;
export declare type FindOneQuery = {
    where: CrudWhere;
    include?: any;
};
export declare type FindManyQuery = FindOneQuery & {
    orderBy: any[];
    skip: number;
    take: number;
};
export declare type PaginationData = {
    skip: number;
    take: number;
    orderBy: any[];
    page: number;
    pageSize: number;
};
export declare type CrudWhere = any;
export declare type CrudMethodOpts = {
    crudQuery: CrudQuery;
    excludeForbiddenPaths?: boolean;
    prismaTransaction?: any;
};
export interface CrudServiceOpts {
    model: string;
    prismaClient?: PrismaClient;
    allowedJoins: string[];
    defaultJoins?: string[];
    forbiddenPaths?: Array<string | RegExp>;
    idPropertyName?: string;
    paginationConfig?: PaginationConfig;
}
export declare type PrismaCrudModuleOpts = {
    prismaService: any;
    accessControl?: {
        strict: boolean;
        authDataKey: string;
        getRolesFromAuthDataFn: GetRolesFunction;
    };
};
