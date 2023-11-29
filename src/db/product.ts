import { Product } from "../models/product.js";
import { database } from "./common.js"

const phones = database.collection<Product>('phones');

async function get(filter={}) : Promise<Product[]> {
    return phones.find<Product>(filter).toArray();
}

export {
    get
}