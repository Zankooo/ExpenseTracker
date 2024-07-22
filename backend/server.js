import express from "express";
import 'dotenv/config';
import authRouter from "./routes/auth.js";
import cors from "cors"

const app = express();

const port = process.env.SERVER_PORT | 3000;

//to rabis da lahko posiljas json objekt kot response
app.use(express.json());

//to rabis da lahko beres body, request.body
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: true}));
//
app.use("/auth", authRouter);
app.get("/", function (request, response){
    response.json({
        message : "helloo!"
    })

})


//na kerm portu poslusamo
app.listen(port, function(){
    console.log(`Serverr listening on ${port} !`);

})
