import { CrudQueryFull } from './types';
export declare function validateNestedWhere(whereObject: any, allowedJoinsSet: Set<string>, prismaBlacklistKeywords?: string[]): void;
export declare function validateJoins(requestedJoins: string[], allowedJoinsSet: Set<string>): void;
export declare function validateNestedOrderBy(orderByObjects: any[], allowedJoinsSet: Set<string>): void;
export declare function validateCrudQueryFull(fullCrudQuery: CrudQueryFull): void;
