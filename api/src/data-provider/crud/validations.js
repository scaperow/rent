"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCrudQueryFull = exports.validateNestedOrderBy = exports.validateJoins = exports.validateNestedWhere = void 0;
const common_1 = require("@nestjs/common");
const Joi = require("joi");
const object_traversal_1 = require("object-traversal");
function validateNestedWhere(whereObject, allowedJoinsSet, prismaBlacklistKeywords = [
    'some',
    'none',
    'every',
    'is',
    'isNot',
    'equals',
    'not',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'mode',
    'startsWith',
    'endsWith',
    'AND\\.\\d+',
    'AND',
    'OR\\.\\d+',
    'OR',
    'NOT',
]) {
    const blackListedWordsRegex = new RegExp(`(^|\\.)${`(${prismaBlacklistKeywords.join('|')})`}*(?=\\.|$)`, 'g');
    const trimDotsRegex = /(^\.+)|(\.+$)/g;
    const repeatedDotsRegex = /\.+/g;
    const lastFragmentRegex = /\.?[^.]+$/;
    const leafArrayContentRegex = /\.(in|notIn)\.\d+$/;
    const leafArrayRegex = /\.(in|notIn)$/;
    (0, object_traversal_1.traverse)(whereObject, (context) => {
        const { value, meta } = context;
        const isLeafArrayContent = leafArrayContentRegex.test(meta.nodePath || '');
        const isLeafArray = meta.nodePath &&
            value instanceof Array &&
            leafArrayRegex.test(meta.nodePath);
        const isLeafNonArray = !isLeafArrayContent && !(value instanceof Object);
        const isLeaf = isLeafArray || isLeafNonArray;
        if (isLeaf) {
            const withoutBlacklistedWords = meta.nodePath.replace(blackListedWordsRegex, '.');
            const withoutRepeatedDots = withoutBlacklistedWords.replace(repeatedDotsRegex, '.');
            const withoutLeadingAndTrailingDots = withoutRepeatedDots.replace(trimDotsRegex, '');
            const cleanedupString = withoutLeadingAndTrailingDots.replace(lastFragmentRegex, '');
            const isAllowed = !cleanedupString || allowedJoinsSet.has(cleanedupString);
            if (!isAllowed) {
                throw new common_1.BadRequestException(`Join relation not allowed: ${cleanedupString}`);
            }
        }
    });
}
exports.validateNestedWhere = validateNestedWhere;
function validateJoins(requestedJoins, allowedJoinsSet) {
    for (let i = 0; i < requestedJoins.length; i++) {
        const reqInclude = requestedJoins[i];
        if (!allowedJoinsSet.has(reqInclude)) {
            throw new common_1.BadRequestException(`Join relation not allowed: ${reqInclude}`);
        }
    }
}
exports.validateJoins = validateJoins;
function validateNestedOrderBy(orderByObjects, allowedJoinsSet) {
    const lastFragmentRegex = /\.?[^.]+$/;
    for (let i = 0; i < orderByObjects.length; i++) {
        (0, object_traversal_1.traverse)(orderByObjects[i], (context) => {
            const { value, meta } = context;
            const isLeaf = !(value instanceof Object);
            if (isLeaf) {
                const leafPath = meta.nodePath;
                const pathWithoutLastFragment = leafPath.replace(lastFragmentRegex, '');
                const isAllowed = !pathWithoutLastFragment ||
                    allowedJoinsSet.has(pathWithoutLastFragment);
                if (!isAllowed) {
                    throw new common_1.BadRequestException(`Join relation not allowed: ${pathWithoutLastFragment}`);
                }
            }
        });
    }
}
exports.validateNestedOrderBy = validateNestedOrderBy;
const crudQueryFullSchema = Joi.object({
    where: Joi.object().required(),
    joins: Joi.array().items(Joi.string()).required(),
    select: Joi.object({
        only: Joi.array().items(Joi.string()),
        except: Joi.array().items(Joi.string()),
    }).required(),
    orderBy: Joi.array().items(Joi.object()).required(),
    page: Joi.number().integer().min(1).required(),
    pageSize: Joi.number().integer().min(1).required(),
});
function validateCrudQueryFull(fullCrudQuery) {
    const { error } = crudQueryFullSchema.validate(fullCrudQuery);
    if (error) {
        throw new common_1.BadRequestException(`fullCrudQuery did not match schema: \n${error}`);
    }
}
exports.validateCrudQueryFull = validateCrudQueryFull;
//# sourceMappingURL=validations.js.map