import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// from Brad Traversy
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(port, function () {
  console.log(`Serverr listening on ${port} !`);
});
