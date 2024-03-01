import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = UserModel.SignUp(name, email, password, type);
    res.status(201).send(user);
  }

  signIn(req, res) {
    const result = UserModel.SignInn(req.body.email, req.body.password);
    if (!result) {
      return res.status(400).send("Incorrect credentials");
    } else {
      //creating JWT Token

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
