import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController {

  constructor(){
    this.userRepository = new UserRepository();
  }

  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new UserModel(name, email, hashedPassword, type);
      await this.userRepository.signUp(user)
      res.status(201).send(user);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong in signUp Controller", 500)
    }
  }

  async signIn(req, res, next) {
    
    try {
      const user = await this.userRepository.findByEmail(req.body.email)
      if(!user){
        return res.status(400).send("Incorrect credentials")
      }
      else
      {
        const result = await bcrypt.compare(req.body.password, user.password);
        if(result){
          //creating JWT Token
  
        //secret key is a random key copied from random key generate website
        const token = jwt.sign(
          { userID: user._id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).send(token);
        }
        else
        {
          return res.status(400).send("Incorrect credentials");
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong in signIn");
    }
        
  }
}
