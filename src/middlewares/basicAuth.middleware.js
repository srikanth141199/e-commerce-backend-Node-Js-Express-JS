import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send("No authorization details found");
  }

  // Extraction Details. format : [Basic  encodedData]
  const base64credentials = authHeader.replace("Basic ", "");

  //decode credentials
  const decodedCreds = Buffer.from(base64credentials, "base64").toString(
    "utf-8"
  );

  const creds = decodedCreds.split(":");

  const users = UserModel.getAll().find(
    (user) => user.email == creds[0] && user.password == creds[1]
  );

  if(users){
    next();
  }
  else{
    return res.status(401).send("Incorrect Credentials");
  }
};

export default basicAuthorizer;