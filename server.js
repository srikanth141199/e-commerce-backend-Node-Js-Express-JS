// 1. Import express
import express from 'express';
import swagger from 'swagger-ui-express';
import cors from 'cors';

// import bodyParser from 'body-parser';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cartItems/cartItems.routes.js';

//middlewares
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';

import apiDocs from './swagger.json' assert {type:'json'};
import { ApplicationError } from './src/error-handler/applicationError.js';

// 2. Create Server
const server = express();

//CORS Policy configuration
var corsOptions = {
    origin : "http://localhost:5500",
    allowedHeaders : "*"
}
server.use(cors(corsOptions));

// server.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin","http://localhost:5500");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Method", "*");
//     //return OK for preflight requests
//     if(req.method == 'OPTIONS'){
//         return res.sendStatus(200);
//     }

//     next();
// })
//in above case where we mentioned 5500, this allows all thw api's to be accessible for domain 5500, if we want to allow for every one we can replace it with "*".

server.use(express.json());

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
// server.use(bodyParser.json());
// for all requests related to product, redirect to product routes.
// localhost:3200/api/products

//server.use("/api/products",basicAuthorizer, productRouter);
server.use(loggerMiddleware);
server.use("/api/products",jwtAuth, productRouter);
server.use("/api/users", userRouter);
server.use("/api/cartItems", jwtAuth, cartRouter);


// 3. Default request handler
server.get('/', (req, res)=>{
    res.send("Welcome to Ecommerce APIs");
});

//Application level Error Handler
server.use((err, req, res, next) => {
    console.log(err);
    if( err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    res.status(500).send("Something went wrong, please try again");
} )

//when any of the above can't handle the request below will be executed and display customized message.
server.use((req, res) => {
    res.status(404).send("API not found")
})
// 4. Specify port.
server.listen(3200,()=>{
    console.log("Server is running at 3200");
});

