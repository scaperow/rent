import { PrismaClient } from ".prisma/client";
import { PrismaQueryBuilder } from "./prisma-query-builder";
import { CrudMethodOpts, CrudServiceOpts, PaginationConfig } from "./types";
export declare class PrismaCrudService {
    static prismaClient: PrismaClient;
    protected paginationConfig: Required<PaginationConfig>;
    protected allowedJoinsSet: Set<string>;
    protected defaultJoins: string[];
    protected prismaClient: any;
    protected model: string;
    protected forbiddenPaths: Array<string | RegExp>;
    protected idPropertyName: string;
    protected prismaQueryBuilder: PrismaQueryBuilder;
    constructor(args: CrudServiceOpts);
    protected setDefaultJoins(defaultJoins: string[] | undefined | null, allowedJoinsSet: Set<string>): string[];
    protected setPaginationConfig(userConfig?: PaginationConfig): Required<PaginationConfig>;
    protected getFullCrudOpts(controllerOpts: CrudMethodOpts): Required<CrudMethodOpts>;
    protected getRepo(opts: CrudMethodOpts): any;
    create(createDto: any, opts: CrudMethodOpts): Promise<any>;
    createMany(createDto: any[], opts: CrudMethodOpts): any[];
    findMany(opts: CrudMethodOpts): Promise<{
        data: any;
        totalRecords: any;
        pageCount: number;
        page: number;
        pageSize: number;
        orderBy: any[];
    }>;
    findOne(id: string | number, opts: CrudMethodOpts): Promise<any>;
    update(id: string | number, updateDto: any, opts: CrudMethodOpts): Promise<any>;
    updateMany(updateDto: any, opts: CrudMethodOpts, where: any): Promise<any>;
    remove(id: string | number, opts: CrudMethodOpts): Promise<any>;
}
