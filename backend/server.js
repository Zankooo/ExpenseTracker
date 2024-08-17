import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./controllers/auth.controller.js";
import groupsRouter from "./controllers/group.controller.js";
import expenseRouter from "./controllers/expense.controller.js";

const app = express();

const port = process.env.SERVER_PORT | 3000;

//to rabis da lahko posiljas json objekt kot response
app.use(express.json());

//to rabis da lahko beres body, request.body
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
//
app.use("/auth", authRouter);
app.use("/groups", groupsRouter);
app.use("/expense", expenseRouter);

//na kerm portu poslusamo
app.listen(port, function () {
  console.log(`Serverr listening on ${port} !`);
});
