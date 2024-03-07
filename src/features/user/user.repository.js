import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


class UserRepository{

    async signUp(newUser) {

        try {
          const db = getDB();
          const collection = db.collection("users");
          await collection.insertOne(newUser);
          return newUser;
        } catch (error) {
          throw new ApplicationError("Something went wrong ith database", 500);
        }
        
    
        //const newUser = new UserModel(name, email, password, type);
        // newUser.id = users.length + 1;
        // users.push(newUser);
      }

    async signInn(email, password) {

        try {
            const db = getDB();
            const collection = db.collection("users");
            return await collection.findOne({email, password});
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with SignInn", 500)
        }
      }
}

export default UserRepository;