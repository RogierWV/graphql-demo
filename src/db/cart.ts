import { database } from "./common.js"
import { Cart } from "../models/cart.js";

const cart = database.collection<Cart>('cart');

async function get({userId}) {
    return cart.findOne<Cart>({userId});
}

async function put({userId, prodId}) {
    let current = get(userId);
    
    // cart.updateOne({userId}, )
}

async function clear({userId}) {
    cart.deleteOne({userId});
}

export {
    get,
    put,
    clear
}