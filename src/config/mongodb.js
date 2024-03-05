import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";

let client;
export const connectToMongDB = () => {
  MongoClient.connect(url).then((clientInstance) => {
    client = clientInstance;
    console.log("Mongo DB is connected");
  }).catch(err=>{
    console.log(err);
  });
};

export const getDB = () => {
    return client.db();
}
