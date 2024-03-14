import { MongoClient } from "mongodb";

const url = process.env.DB_URL;

let client;
export const connectToMongDB = () => {
  MongoClient.connect(url).then((clientInstance) => {
    client = clientInstance;
    console.log("Mongo DB is connected");
    createCounter(client.db());
  }).catch(err=>{
    console.log(err);
  });
};

export const getDB = () => {
    return client.db();
}

const createCounter = async(db) => {
  const existingCounter = await db.collection("counters").findOne({_id:'cartItemId'});
  if(!existingCounter){
    db.collection("counters").insertOne({_id:'cartItemId', value:0})
  }
}