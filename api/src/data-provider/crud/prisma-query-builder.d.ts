import { CrudQuery, CrudQueryFull, FindManyQuery, FindOneQuery, PaginationConfig, PaginationData } from './types';
export declare class PrismaQueryBuilder {
    private crudServiceOpts;
    private DEFAULT_CRUD_QUERY;
    constructor(crudServiceOpts: {
        defaultJoins: string[];
        paginationConfig: Required<PaginationConfig>;
        idPropertyName: string;
        allowedJoinsSet: Set<string>;
    });
    private buildPagination;
    private buildFindQuery;
    parseCrudQuery(crudQuery: CrudQuery): CrudQueryFull;
    buildFindManyQuery(parsedCrudQuery: CrudQueryFull): {
        pagination: PaginationData;
        findManyQuery: FindManyQuery;
    };
    buildFindOneQuery(parsedCrudQuery: CrudQueryFull, id: string | number): FindOneQuery;
    buildCreateQuery(createDto: any): any;
    buildUpdateQuery(updateDto: any, persistedEntity: any): any;
}
