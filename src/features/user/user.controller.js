import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const user = await UserModel.SignUp(name, email, password, type);
      res.status(201).send(user);
    } catch (error) {
      throw new ApplicationError("Something went wrong in signUp Controller", 500)
    }
  }

  signIn(req, res) {
    const result = UserModel.SignInn(req.body.email, req.body.password);
    if (!result) {
      return res.status(400).send("Incorrect credentials");
    } else {
      //creating JWT Token

      //secret key is a random key copied from random key generate website
      const token = jwt.sign(
        { userID: result.id, email: result.email },
        "tN3NBpi4uWpGa93C6pWSI35p0bajNcUm",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).send(token);
    }
  }
}
