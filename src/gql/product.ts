import { get } from "../db/product.js"
import { Partial } from "./partial.js";

export default class Product implements Partial {
    typeDefs = `#graphql
        type Product {
            id: Int
            name: String
            price: Float
            description: String
        }

        input ProductFilters {
            id: Int
            name: String
        }
    `;

    queryParts = `#graphql
        products(filter: ProductFilters): [Product]
    `;

    resolvers = {
        Query: {
            products (parent, args, context, info) {
                return get(args.filter || {});
            },
        }
    }
}