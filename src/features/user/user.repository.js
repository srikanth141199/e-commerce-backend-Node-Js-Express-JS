import mongoose from "mongoose";
import { userScheme } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

//creating model from Schema
const UserModel = mongoose.model("User", userScheme);

export default class UserRepository {

  async resetPassword(userId, hashedPassword){
    try {
      let user = await UserModel.findById(userId)
      //console.log(userId);
      //console.log(hashedPassword);
      //console.log(user);
      user.password = hashedPassword;
      user.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something went wrong in Repo while Resetting Password",
        500
      );
    }
  }

  async signUp(user) {
    try {
      //create a instance of model. this is basically a constructor of a model from which we can get a Document of a collection.
      const newUser = new UserModel(user);
      await newUser.save(); //this saves the document
      return newUser;
    } catch (error) {
      console.log(error);
      if(error instanceof mongoose.Error.ValidationError){
        throw error;
      }
      else{
        console.log(error);
        throw new ApplicationError(
          "Something went wrong in Repo while signUp",
          500
        );
      }
    }
  }

  async signIn(email, password) {
    try {
      return await UserModel.findOne({ email, password });
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something went wrong in Repo while signUp",
        500
      );
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something went wrong with Find By Email",
        500
      );
    }
  }
}
