import { database } from "./common.js"
import Cart from "../gql/cart.js";

const cart = database.collection<Cart>('cart');

async function get({userId}) : Promise<Cart> {
    return cart.findOne<Cart>({userId});
}

async function put({userId, prodId}) {
    let current = await get(userId);
    if (current === null) cart.insertOne({userId: userId, products: [prodId]});
    if (current.products.filter(p => p.id === prodId).length > 0) return;
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