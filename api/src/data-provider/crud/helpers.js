"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObjectProperties = exports.getAllJoinSubsets = exports.transformJoinsToInclude = exports.plainToPrismaNestedQuery = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const object_traversal_1 = require("object-traversal");
const utils_1 = require("./utils");
const lodash_2 = require("lodash");
function plainToPrismaNestedQuery(objectToPersist, currentPersistedObject, allowedJoinSet, idPropertyName) {
    const copy = JSON.parse(JSON.stringify(objectToPersist));
    const keywords = new Set([
        'connectOrCreate',
        'where',
        'create',
        'connect',
        'disconnect',
        'set',
    ]);
    (0, object_traversal_1.traverse)(copy, (context) => {
        var _a;
        let { parent, key } = context;
        const { value, meta } = context;
        const keyIsNotKeyword = !keywords.has(key);
        const parentIsObject = parent instanceof Object;
        const parentIsNotArray = !(parent instanceof Array);
        const valueIsObject = value instanceof Object;
        const valueIsArray = value instanceof Array;
        const pathWithoutDigits = (_a = meta.nodePath) === null || _a === void 0 ? void 0 : _a.replace(/.\d+./, '.');
        const pathIsWithinAllowedJoins = allowedJoinSet.has(pathWithoutDigits);
        if (parentIsObject &&
            parentIsNotArray &&
            valueIsObject &&
            keyIsNotKeyword) {
            parent = parent;
            key = key;
            if (!pathIsWithinAllowedJoins) {
                throw new common_1.BadRequestException(`Provided nested relation is not allowed: ${pathWithoutDigits}`);
            }
            if (valueIsArray) {
                const toCreate = value.filter((v) => !v[idPropertyName]);
                const toConnect = value
                    .filter((v) => !!v[idPropertyName])
                    .map((v) => ({ [idPropertyName]: v[idPropertyName] }));
                const idsToDisconnect = getIdsToDisconnect(toConnect, (0, utils_1.getNestedProperty)(currentPersistedObject, meta.nodePath), idPropertyName);
                const toUpdate = (0, lodash_2.compact)(value.map((v, index) => {
                    if (!!v[idPropertyName]) {
                        const originalNestedProperty = (0, utils_1.getNestedProperty)(currentPersistedObject, `${meta.nodePath}`);
                        const onp = originalNestedProperty.find((ov) => ov[idPropertyName] === v[idPropertyName]);
                        if (onp) {
                            const diff = (0, lodash_2.fromPairs)((0, lodash_2.differenceWith)((0, lodash_2.toPairs)(v).filter(([k, v]) => !(0, lodash_2.isObject)(v) &&
                                !['createdAt', 'updatedAt', 'id'].includes(k)), (0, lodash_2.toPairs)(onp).filter(([k, v]) => !(0, lodash_2.isObject)(v) && !['createdAt', 'updatedAt'].includes(k)), lodash_2.isEqual));
                            if (!(0, lodash_1.isEmpty)(diff)) {
                                return {
                                    where: {
                                        [idPropertyName]: v[idPropertyName],
                                    },
                                    data: diff,
                                };
                            }
                        }
                    }
                }));
                parent[key] = {
                    update: toUpdate.length ? toUpdate : undefined,
                    create: toCreate.length ? toCreate : undefined,
                    connect: toConnect.length && !toUpdate.length ? toConnect : undefined,
                    disconnect: idsToDisconnect.length ? idsToDisconnect : undefined,
                };
            }
            else if (value[idPropertyName]) {
                const currentPersistedId = (0, utils_1.getNestedProperty)(currentPersistedObject, `${meta.nodePath}.${idPropertyName}`);
                const idChanged = value[idPropertyName] !== currentPersistedId;
                parent[key] = {
                    connect: idChanged
                        ? { [idPropertyName]: value[idPropertyName] }
                        : undefined,
                };
            }
            else {
                if (!(0, lodash_1.isEmpty)(value)) {
                    parent[key] = {
                        create: value,
                    };
                }
            }
        }
        else if (parentIsObject && value === null) {
            parent = parent;
            key = key;
            const persistedValue = (0, utils_1.getNestedProperty)(currentPersistedObject, `${meta.nodePath}`);
            const persistedValueIsRelation = persistedValue instanceof Object;
            const persistedValueIsAlreadyNull = persistedValue === null;
            if (persistedValueIsRelation) {
                parent[key] = {
                    disconnect: true,
                };
            }
            else if (persistedValueIsAlreadyNull) {
                parent[key] = undefined;
            }
        }
    });
    return copy;
}
exports.plainToPrismaNestedQuery = plainToPrismaNestedQuery;
function transformJoinsToInclude(joins) {
    if (!joins.length) {
        return {};
    }
    joins = joins.slice();
    joins.sort(function (a, b) {
        return b.length - a.length;
    });
    const stringToObject = {};
    for (let i = 0; i < joins.length; i++) {
        const join = joins[i];
        const fragments = join.split('.');
        let workingNestedObject = stringToObject;
        for (let j = 0; j < fragments.length; j++) {
            const fragment = fragments[j];
            const fragmentAlreadyAdded = !!workingNestedObject[fragment];
            const isLastFragment = j === fragments.length - 1;
            if (!fragmentAlreadyAdded) {
                workingNestedObject[fragment] = isLastFragment || {
                    include: {},
                };
            }
            workingNestedObject = workingNestedObject[fragment].include;
        }
    }
    return { include: stringToObject };
}
exports.transformJoinsToInclude = transformJoinsToInclude;
function getAllJoinSubsets(allowedJoins) {
    const joinSet = new Set();
    for (let i = 0; i < allowedJoins.length; i++) {
        const joinString = allowedJoins[i];
        const fragments = joinString.split('.');
        let chain = fragments[0];
        joinSet.add(chain);
        for (let j = 1; j < fragments.length; j++) {
            chain += `.${fragments[j]}`;
            joinSet.add(chain);
        }
    }
    return joinSet;
}
exports.getAllJoinSubsets = getAllJoinSubsets;
function deleteObjectProperties(object, blacklistedPropertyPaths, whitelistedPropertyPaths, ignoreArrayIndexes = false) {
    blacklistedPropertyPaths = blacklistedPropertyPaths || [];
    whitelistedPropertyPaths = whitelistedPropertyPaths || [];
    (0, object_traversal_1.traverse)(object, (context) => {
        const { parent, key, meta } = context;
        if (!parent || !key || !meta.nodePath) {
            return;
        }
        let nodePath = meta.nodePath;
        if (ignoreArrayIndexes) {
            nodePath = nodePath.replace(/\.\d+\./g, '.');
            nodePath = nodePath.replace(/\.\d+$/, '');
        }
        for (let i = 0; i < blacklistedPropertyPaths.length; i++) {
            const deniedPath = blacklistedPropertyPaths[i];
            let pathIsBlacklisted = false;
            if (typeof deniedPath === 'string') {
                pathIsBlacklisted = deniedPath === nodePath;
            }
            if (deniedPath instanceof RegExp) {
                pathIsBlacklisted = deniedPath.test(nodePath);
            }
            if (pathIsBlacklisted) {
                delete parent[key];
                break;
            }
        }
        if (whitelistedPropertyPaths === null || whitelistedPropertyPaths === void 0 ? void 0 : whitelistedPropertyPaths.length) {
            let pathIsWhiteListed = false;
            for (let i = 0; i < whitelistedPropertyPaths.length; i++) {
                const allowedPath = whitelistedPropertyPaths[i];
                if (typeof allowedPath === 'string') {
                    pathIsWhiteListed = allowedPath.startsWith(nodePath);
                }
                if (allowedPath instanceof RegExp) {
                    pathIsWhiteListed = allowedPath.test(nodePath);
                }
                if (pathIsWhiteListed) {
                    break;
                }
            }
            if (!pathIsWhiteListed) {
                delete parent[key];
            }
        }
    });
}
exports.deleteObjectProperties = deleteObjectProperties;
function getIdsToDisconnect(stillConnected, originalConnections, idPropertyName) {
    const originalIds = (originalConnections || []).map((v) => v[idPropertyName]);
    const stillConnectedSet = new Set(stillConnected.map((v) => v[idPropertyName]));
    const forDisconnecting = [];
    for (let i = 0; i < originalIds.length; i++) {
        const id = originalIds[i];
        if (!stillConnectedSet.has(id)) {
            forDisconnecting.push(id);
        }
    }
    return forDisconnecting.map((v) => ({ [idPropertyName]: v }));
}
//# sourceMappingURL=helpers.js.map