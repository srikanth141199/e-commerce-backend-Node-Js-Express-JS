import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";

const connectToMongDB = () => {
  MongoClient.connect(url).then((client) => {
    console.log("Mongo DB is connected");
  }).catch(err=>{
    console.log(err);
  });
};

export default connectToMongDB;
