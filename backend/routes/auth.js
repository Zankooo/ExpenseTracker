import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";



const authRouter = Router()

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", authMiddleWare, me);


export default authRouter;


// strukturo buildamo na podlagi url naslova
