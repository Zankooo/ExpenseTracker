import { Router } from "express";
import { createGroup, getGrupa, getGroupsForUser, addUser} from "../controllers/group.controller.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";




const groupsRouter = Router()

groupsRouter.post("/", authMiddleWare, createGroup);
groupsRouter.post("/invite", authMiddleWare, addUser);
groupsRouter.get("/group", authMiddleWare, getGrupa);
groupsRouter.get("/userGroups", authMiddleWare, getGroupsForUser);




export default groupsRouter;


// strukturo buildamo na podlagi url naslova
