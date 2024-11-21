"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaQueryBuilder = void 0;
const helpers_1 = require("./helpers");
const validations_1 = require("./validations");
class PrismaQueryBuilder {
    constructor(crudServiceOpts) {
        this.crudServiceOpts = crudServiceOpts;
        this.DEFAULT_CRUD_QUERY = {
            where: {},
            joins: this.crudServiceOpts.defaultJoins,
            select: {},
            orderBy: this.crudServiceOpts.paginationConfig.defaultOrderBy,
            page: 1,
            pageSize: this.crudServiceOpts.paginationConfig.defaultPageSize,
        };
    }
    buildPagination(parsedCrudQuery) {
        let { page, pageSize, orderBy } = parsedCrudQuery;
        pageSize =
            pageSize > this.crudServiceOpts.paginationConfig.maxPageSize
                ? this.crudServiceOpts.paginationConfig.maxPageSize
                : pageSize;
        (0, validations_1.validateNestedOrderBy)(orderBy, this.crudServiceOpts.allowedJoinsSet);
        const paginationObj = {
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy,
            page,
            pageSize,
        };
        return paginationObj;
    }
    buildFindQuery(parsedCrudQuery, pagination) {
        (0, validations_1.validateNestedWhere)(parsedCrudQuery.where, this.crudServiceOpts.allowedJoinsSet);
        (0, validations_1.validateJoins)(parsedCrudQuery.joins, this.crudServiceOpts.allowedJoinsSet);
        const includes = (0, helpers_1.transformJoinsToInclude)(Array.from(new Set(parsedCrudQuery.joins)));
        const prismaFindOneQuery = Object.assign(Object.assign({}, includes), { where: parsedCrudQuery.where });
        let prismaFindManyQuery = null;
        if (pagination) {
            prismaFindManyQuery = Object.assign({}, prismaFindOneQuery);
            prismaFindManyQuery.orderBy = pagination.orderBy;
            prismaFindManyQuery.skip = pagination.skip;
            prismaFindManyQuery.take = pagination.take;
        }
        return prismaFindManyQuery || prismaFindOneQuery;
    }
    parseCrudQuery(crudQuery) {
        if (typeof crudQuery === 'string') {
            crudQuery = JSON.parse(crudQuery);
        }
        const crudQueryFull = Object.assign({}, this.DEFAULT_CRUD_QUERY, crudQuery);
        (0, validations_1.validateCrudQueryFull)(crudQueryFull);
        return crudQueryFull;
    }
    buildFindManyQuery(parsedCrudQuery) {
        const pagination = this.buildPagination(parsedCrudQuery);
        const findManyQuery = this.buildFindQuery(parsedCrudQuery, pagination);
        return { pagination, findManyQuery };
    }
    buildFindOneQuery(parsedCrudQuery, id) {
        const findOneQuery = this.buildFindQuery(parsedCrudQuery);
        findOneQuery.where = Object.assign(Object.assign({}, findOneQuery.where), { [this.crudServiceOpts.idPropertyName]: id });
        return findOneQuery;
    }
    buildCreateQuery(createDto) {
        return (0, helpers_1.plainToPrismaNestedQuery)(createDto, null, this.crudServiceOpts.allowedJoinsSet, this.crudServiceOpts.idPropertyName);
    }
    buildUpdateQuery(updateDto, persistedEntity) {
        return (0, helpers_1.plainToPrismaNestedQuery)(updateDto, persistedEntity, this.crudServiceOpts.allowedJoinsSet, this.crudServiceOpts.idPropertyName);
    }
}
exports.PrismaQueryBuilder = PrismaQueryBuilder;
//# sourceMappingURL=prisma-query-builder.js.map