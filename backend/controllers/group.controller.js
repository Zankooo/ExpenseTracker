//kjer rabis user id dobis iz request.user
//group
import { GroupService } from "../services/group.service.js";
import { Router } from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";

const groupRouter = Router();

groupRouter.get("/group", authMiddleWare, async function getGrup(request, response) {
    const { groupId } = request.query;
    const group = await GroupService.getGroup(groupId);
    response.status(200).json({
      group,
    });
    return;
  }
);

groupRouter.post("/", authMiddleWare, async function createGroup(request, response) {
    const { name, description } = request.body;
    const adminId = request.user;
    if (!name | !description) {
      response.status(400).json({
        message: "Name ali description nam manjka",
      });
      return;
    }
    const group = await GroupService.createGroup(name, adminId, description);
    response.status(200).json({
      message: "Grupa uspešno ustvarjena",
      group: group,
    });
  }
);

groupRouter.get("/userGroups", authMiddleWare, async function getGroupsForUser(request, response) {
    const userId = request.user;
    const groups = await GroupService.getGroupsForUser(userId);
    response.status(200).json({
      groups,
    });
  }
);

groupRouter.post("/invite", authMiddleWare, async function addUser(request, response) {
    const { userId, groupId } = request.query;
    const existingMember = await GroupService.isMember(userId, groupId);
    if (existingMember) {
      response.status(400).json({
        message: "You are already a member of this group",
      });
      return;
    }
    await GroupService.addUser(userId, groupId);
    response.status(200).json({
      message: "you have been added to group!",
    });
  }
);

export default groupRouter;