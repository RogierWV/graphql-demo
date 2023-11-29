interface Resolvers {
    Query: object;
}

export interface Partial {
    typeDefs: string;
    queryParts: string;
    resolvers: Resolvers;
}