import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  //Read the Token
  //console.log(req.headers);
  const token = req.headers["authorization"];
  console.log('Token : ',token);

  //Check if no Token
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  //check if JWT Token is valid
  try {
    const payload = jwt.verify(token, "tN3NBpi4uWpGa93C6pWSI35p0bajNcUm");
    console.log(payload);
  } catch (error) {
    console.log("error : ", error);
    return res.status(401).send("Unauthorized");
  }

  next();
};

export default jwtAuth;
