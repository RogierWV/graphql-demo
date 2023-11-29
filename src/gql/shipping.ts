import { get } from "../db/shipping.js"
import { Partial } from "./partial.js";

export default class Shipping implements Partial {
    typeDefs = `#graphql
        type Shipping {
            type: String
            price: Float
        }
    `;

    queryParts = `#graphql
        shipping: [Shipping]
    `;

    resolvers = {
        Query: {
            shipping (parent, args, context, info) { 
                return get(args || {}) 
            }
        }
    }
}