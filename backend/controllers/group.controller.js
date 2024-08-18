//kjer rabis user id dobis iz request.user
//group
import { GroupService } from "../services/group.service.js";
import { Router } from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { ExpenseService } from "../services/expense.service.js";

const groupRouter = Router();

groupRouter.get(
  "/group",
  authMiddleWare,
  async function getGrup(request, response) {
    const { groupId } = request.query;
    const group = await GroupService.getGroup(groupId);
    response.status(200).json({
      group,
    });
    return;
  }
);

groupRouter.post(
  "/",
  authMiddleWare,
  async function createGroup(request, response) {
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

groupRouter.get(
  "/userGroups",
  authMiddleWare,
  async function getGroupsForUser(request, response) {
    const userId = request.user;
    const groups = await GroupService.getGroupsForUser(userId);
    response.status(200).json({
      groups,
    });
  }
);

groupRouter.post(
  "/invite",
  authMiddleWare,
  async function addUser(request, response) {
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

groupRouter.get(
  "/members",
  authMiddleWare,
  async function getMembers(request, response) {
    const { groupId } = request.query;
    const members = await GroupService.getMembers(groupId);
    response.status(200).json({
      members: members,
    });
  }
);

groupRouter.get(
  "/expenses",
  authMiddleWare,
  async function getExpenses(request, response) {
    const { groupId } = request.query;
    const expenses = await GroupService.getExpenses(groupId);
    response.status(200).json({
      expenses,
    });
    return;
  }
);

groupRouter.get(
  "/total",
  authMiddleWare,
  async function getTotalCost(request, response) {
    const { groupId } = request.params;
    const total = await GroupService.getTotalCost(groupId);
    return response.status(200).json({
      total: total,
    });
  }
);

groupRouter.get("/returns", authMiddleWare, async function (request, response) {
  const { groupId } = request.query;
  const result = await ExpenseService.simplifyDebt(groupId);
  response.status(200).json({
    returns: result,
  });
  return;
});

export default groupRouter;
