import { ApolloServer } from "@apollo/server";
import { loggerPlugin } from "./logger.js";
import { Partial } from "./partial.js";
import { readdir } from "fs";
import { fileURLToPath } from 'url';
import path from "path";
import { promisify } from "util";

// legacy style globals that no longer exist
const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// load the implementing classes for the Partial interface defined in ./partial.ts
let classes: Partial[] = await (async () => {
    const excludes = ["index.js", "partial.js", "logger.js"];
    const _readdir = promisify(readdir);
    const files = (await _readdir(__dirname))
        .filter(f => !excludes.includes(f))
        .map(f => path.resolve(__dirname, f))
        .map(f => `file://${f}`);
    return (await Promise.all(files.map(f => import(f)))).map(c => new c.default());
})();

// generate singular typedefs string from the loaded implementations
let typeDefs = `#graphql
    ${classes.map(c => c.typeDefs).concat("\n")}

    type Query {
        ${classes.map(c => c.queryParts).concat("\n")}
    }
`;

// create singular object to represent resolvers.Query 
const qObj = classes.map(c => c.resolvers.Query)
    .reduce((acc, cur) => ({...acc, ...cur}));

let resolvers = {
    Query: qObj,
};

export const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [loggerPlugin]
});