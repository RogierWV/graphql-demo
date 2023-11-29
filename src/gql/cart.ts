import { get, put, clear } from "../db/cart.js"
import { Partial } from "./partial.js";

export default class Cart implements Partial {
    typeDefs = `#graphql
        type Cart {
            userId: Int!
            products: [Product]
        }

        input CartInput {
            userId: Int
            product: Int
        }
    `; 

    queryParts = `#graphql
        cart(filter: CartInput): Cart
        putCart(filter: CartInput): Cart
        clearCart(filter: CartInput): Cart
    `;

    resolvers = {
        Query: {
            cart(parent, args, context, info) {
                return get(args.filter);
            },
            putCart(parent, args, context, info) {
                return put(args.filter);
            },
            clearCart(parent, args, context, info) {
                return clear(args.filter);
            },
        }
    }
}