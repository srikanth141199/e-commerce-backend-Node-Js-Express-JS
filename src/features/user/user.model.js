import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }

  // static async SignUp(name, email, password, type) {

  //   try {
  //     const db = getDB();
  //     const collection = db.collection("users");
  //     const newUser = new UserModel(name, email, password, type);
  //     await collection.insertOne(newUser);
  //     return newUser;
  //   } catch (error) {
  //     throw new ApplicationError("Something went wrong", 500);
  //   }
    

  //   //const newUser = new UserModel(name, email, password, type);
  //   // newUser.id = users.length + 1;
  //   // users.push(newUser);
  // }

  // static SignInn(email, password) {
  //   const user = users.find(
  //     (user) => user.email == email && user.password == password
  //   );
  //   return user;
  // }

  static getAll(){
    return users;
  }
}

var users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@ecom.com",
    password: "Password1",
    type: "seller",
  },
];
