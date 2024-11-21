"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWhereObject = exports.getNestedProperty = void 0;
function getNestedProperty(obj, nestedPath) {
    const fragments = nestedPath.split('.');
    let value = obj;
    for (let i = 0; i < fragments.length; i++) {
        const fragment = fragments[i];
        value = value === null || value === void 0 ? void 0 : value[fragment];
        if (!value) {
            break;
        }
    }
    return value;
}
exports.getNestedProperty = getNestedProperty;
function createWhereObject(fullPath, targetValue, prismaOperator = 'equals', startingObj = {}) {
    const fragments = fullPath.split('.');
    const rootObj = startingObj;
    let workingWhereObj = rootObj;
    for (let i = 0; i < fragments.length; i++) {
        const fragment = fragments[i];
        const isLastFragment = i === fragments.length - 1;
        workingWhereObj[fragment] = isLastFragment ? { [prismaOperator]: targetValue } : {};
        workingWhereObj = workingWhereObj[fragment];
    }
    return rootObj;
}
exports.createWhereObject = createWhereObject;
//# sourceMappingURL=utils.js.map