import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri, { monitorCommands:true });
const database = client.db(process.env.DB_NAME || 'phones');

for(let c of [ // comment or uncomment as desired
    "commandStarted", 
    "commandSucceeded", 
    "commandFailed",
]){
    client.on(c, event => console.log(JSON.stringify(event, null, 2)));
}

await client.db("admin").command({ ping: 1 });

export {
    database
};