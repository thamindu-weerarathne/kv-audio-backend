import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import userRouter from "./Routes/userRouter.js";
import productRouter from "./Routes/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//import body-parser library
app.use(bodyParser.json());

//How to add middleware for read token
app.use((req, res, next) => {
    let token = req.headers['authorization']; // Read token from header

    if (token != null) {
        token = token.replace("Bearer ", "");
        jwt.verify(token, "kv-secret-89!",
            (err, decoded) => {
            if (!err) {
                req.user = decoded; // Attach decoded data to the request
            }
        });
    }

    next(); // Make sure to call next() to continue the request
});


//How to connect mongoDB
let mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl)

let connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
});