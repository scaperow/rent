export declare function plainToPrismaNestedQuery(objectToPersist: any, currentPersistedObject: any, allowedJoinSet: Set<string>, idPropertyName: string): any;
export declare function transformJoinsToInclude(joins: string[]): {
    include?: undefined;
} | {
    include: any;
};
export declare function getAllJoinSubsets(allowedJoins: string[]): Set<string>;
export declare function deleteObjectProperties(object: any, blacklistedPropertyPaths?: Array<string | RegExp>, whitelistedPropertyPaths?: Array<string | RegExp>, ignoreArrayIndexes?: boolean): void;
