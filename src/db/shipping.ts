import { database } from "./common.js"
import { Shipping } from "../models/shipping.js";

const shipping = database.collection<Shipping>('shipping');

async function get(filter={}) {
    return shipping.find<any>(filter).toArray();
}

export {
    get
}