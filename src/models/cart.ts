import { Product } from "./product.js";

export interface Cart {
    userId: number;
    products: Product[];
}