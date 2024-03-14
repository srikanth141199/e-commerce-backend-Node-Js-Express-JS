import { MongoClient } from "mongodb";

const url = process.env.DB_URL;

let client;
export const connectToMongDB = () => {
  MongoClient.connect(url).then((clientInstance) => {
    client = clientInstance;
    console.log("Mongo DB is connected");
    createCounter(client.db());
    createIndexes(client.db());
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

const createIndexes = async(db) => {
  try {
    await db.collection("products").createIndex({price: 1});//this is example of single field indexing
    await db.collection("products").createIndex({name:1, category:-1}) // this is an example of compound indexing
    await db.collection("products").createIndex({desc:"text"})// this is an example of text based Indexing
  } catch (error) {
    console.log(error);
  }
}