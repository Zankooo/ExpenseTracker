import { authMiddleWare } from "../middleware/authMiddleware.js";
import { ExpenseService } from "../services/expense.service.js";
import { GroupService } from "../services/group.service.js";
import { AuthService } from "../services/auth.service.js";
import { Router } from "express";

const expenseRouter = Router();

expenseRouter.post(
  "/",
  authMiddleWare,
  async function addExpense(request, response) {
    const { name, cost } = request.body;
    const userId = request.user;
    const { groupId } = request.query;
    if (!name | !cost) {
      response.status(400).json({
        message: "Neki je slo narobe, oziroma neki manjka",
      });
      return;
    }

    const user = await AuthService.findOneById(userId);

    let expense = await ExpenseService.createExpense(
      name,
      cost,
      userId,
      groupId
    );

    expense = {
      ...expense,
      user: { username: user.username },
    };

    response.status(200).json({
      message: "Use kul, uspesno ustvarjen expense",
      expense: expense,
    });
  }
);

export default expenseRouter;
