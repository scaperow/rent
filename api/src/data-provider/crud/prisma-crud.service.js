"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCrudService = void 0;
const common_1 = require("@nestjs/common");
const helpers_1 = require("./helpers");
const prisma_query_builder_1 = require("./prisma-query-builder");
const DEFAULT_CRUD_METHOD_OPTS = {
    crudQuery: {},
    excludeForbiddenPaths: true,
    prismaTransaction: undefined
};
class PrismaCrudService {
    constructor(args) {
        this.model = args.model;
        this.prismaClient = args.prismaClient || PrismaCrudService.prismaClient;
        this.idPropertyName = args.idPropertyName || "id";
        this.allowedJoinsSet = (0, helpers_1.getAllJoinSubsets)(args.allowedJoins);
        this.defaultJoins = this.setDefaultJoins(args.defaultJoins, this.allowedJoinsSet);
        this.forbiddenPaths = args.forbiddenPaths || [];
        this.paginationConfig = this.setPaginationConfig(args.paginationConfig);
        this.prismaQueryBuilder = new prisma_query_builder_1.PrismaQueryBuilder({
            defaultJoins: this.defaultJoins,
            paginationConfig: this.paginationConfig,
            idPropertyName: this.idPropertyName,
            allowedJoinsSet: this.allowedJoinsSet
        });
    }
    setDefaultJoins(defaultJoins, allowedJoinsSet) {
        if (!(defaultJoins instanceof Array)) {
            return Array.from(allowedJoinsSet);
        }
        for (let i = 0; i < defaultJoins.length; i++) {
            const join = defaultJoins[i];
            if (!allowedJoinsSet.has(join)) {
                throw new common_1.InternalServerErrorException(`defaultJoins contains strings that are not preset in allowedJoins`);
            }
        }
        return Array.from(new Set(defaultJoins));
    }
    setPaginationConfig(userConfig) {
        const PAGINATION_DEFAULTS = {
            defaultPageSize: 25,
            maxPageSize: 100,
            defaultOrderBy: [{ [this.idPropertyName]: "asc" }]
        };
        const paginationConfig = Object.assign({}, PAGINATION_DEFAULTS, userConfig);
        return paginationConfig;
    }
    getFullCrudOpts(controllerOpts) {
        return Object.assign({}, DEFAULT_CRUD_METHOD_OPTS, controllerOpts);
    }
    getRepo(opts) {
        const prismaTransaction = opts.prismaTransaction || this.prismaClient;
        return prismaTransaction[this.model];
    }
    async create(createDto, opts) {
        const fullOpts = this.getFullCrudOpts(opts);
        const repo = this.getRepo(fullOpts);
        console.log('------');
        console.log(this.prismaQueryBuilder.buildCreateQuery(createDto));
        const entity = await repo.create({
            data: this.prismaQueryBuilder.buildCreateQuery(createDto)
        });
        return this.findOne(entity[this.idPropertyName], fullOpts);
    }
    createMany(createDto, opts) {
        const fullOpts = this.getFullCrudOpts(opts);
        const repo = this.getRepo(fullOpts);
        return createDto.map((dto) => {
            return repo.create({
                data: this.prismaQueryBuilder.buildCreateQuery(dto)
            });
        });
    }
    async findMany(opts) {
        var _a, _b;
        const fullOpts = this.getFullCrudOpts(opts);
        const repo = this.getRepo(fullOpts);
        const parsedCrudQuery = this.prismaQueryBuilder.parseCrudQuery(fullOpts.crudQuery);
        const { findManyQuery, pagination } = this.prismaQueryBuilder.buildFindManyQuery(parsedCrudQuery);
        const { orderBy, page, pageSize } = pagination;
        const summary = await repo.aggregate({
            where: findManyQuery.where,
            _count: { [this.idPropertyName]: true }
        });
        const count = summary._count[this.idPropertyName];
        const recordsPerPage = pageSize;
        const pageCount = Math.ceil(count / recordsPerPage);
        let matches = await repo.findMany(findManyQuery);
        if (fullOpts.excludeForbiddenPaths) {
            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];
                (0, helpers_1.deleteObjectProperties)(match, this.forbiddenPaths);
            }
        }
        if (((_a = parsedCrudQuery.select.only) === null || _a === void 0 ? void 0 : _a.length) ||
            ((_b = parsedCrudQuery.select.except) === null || _b === void 0 ? void 0 : _b.length)) {
            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];
                (0, helpers_1.deleteObjectProperties)(match, parsedCrudQuery.select.except, parsedCrudQuery.select.only, true);
            }
        }
        return {
            data: matches,
            totalRecords: count,
            pageCount,
            page,
            pageSize,
            orderBy
        };
    }
    async findOne(id, opts) {
        var _a, _b;
        if (id === null || id === undefined) {
            throw new common_1.InternalServerErrorException(`findOne received invalid id ${id}`);
        }
        const fullOpts = this.getFullCrudOpts(opts);
        const repo = this.getRepo(fullOpts);
        const parsedCrudQuery = this.prismaQueryBuilder.parseCrudQuery(fullOpts.crudQuery);
        const findOneQuery = this.prismaQueryBuilder.buildFindOneQuery(parsedCrudQuery, id);
        let match = await repo.findFirst(findOneQuery);
        if (!match) {
            throw new common_1.NotFoundException();
        }
        if (fullOpts.excludeForbiddenPaths) {
            (0, helpers_1.deleteObjectProperties)(match, this.forbiddenPaths);
        }
        if (((_a = parsedCrudQuery.select.only) === null || _a === void 0 ? void 0 : _a.length) ||
            ((_b = parsedCrudQuery.select.except) === null || _b === void 0 ? void 0 : _b.length)) {
            (0, helpers_1.deleteObjectProperties)(match, parsedCrudQuery.select.except, parsedCrudQuery.select.only, true);
        }
        return match;
    }
    async update(id, updateDto, opts) {
        const fullOpts = this.getFullCrudOpts(opts);
        const repo = this.getRepo(fullOpts);
        const entity = await this.findOne(id, fullOpts);
        await repo.update({
            where: { [this.idPropertyName]: entity[this.idPropertyName] },
            data: this.prismaQueryBuilder.buildUpdateQuery(updateDto, entity)
        });
        return this.findOne(id, fullOpts);
    }
    async updateMany(updateDto, opts, where) {
        const fullOpts = this.getFullCrudOpts(opts);
        const repo = this.getRepo(fullOpts);
        return repo.updateMany({
            where,
            data: updateDto
        });
    }
    async remove(id, opts) {
        const fullOpts = this.getFullCrudOpts(opts);
        const repo = this.getRepo(fullOpts);
        const entity = await this.findOne(id, fullOpts);
        await repo.delete({
            where: { [this.idPropertyName]: entity[this.idPropertyName] }
        });
        return null;
    }
}
exports.PrismaCrudService = PrismaCrudService;
//# sourceMappingURL=prisma-crud.service.js.map