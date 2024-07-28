import { Router } from "express";
import { createGroup, getGrupa, getGroupsForUser} from "../controllers/group.controller.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";



const groupsRouter = Router()

groupsRouter.post("/", authMiddleWare, createGroup);
groupsRouter.get("/group", authMiddleWare, getGrupa);
groupsRouter.get("/userGroups", authMiddleWare, getGroupsForUser);




export default groupsRouter;


// strukturo buildamo na podlagi url naslova
