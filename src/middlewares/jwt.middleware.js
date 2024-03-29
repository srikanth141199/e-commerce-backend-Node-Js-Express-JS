import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  //Read the Token
  //console.log(req.headers);
  const token = req.headers["authorization"];
  //console.log('Token : ',token);

  //Check if no Token
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  //check if JWT Token is valid
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(payload);
    req.body.userID = payload.userID;
  } catch (error) {
    //console.log("error : ", error);
    return res.status(401).send("Unauthorized");
  }

  next();
};

export default jwtAuth;
