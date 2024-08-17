import { prisma } from "../config/prisma";
import { ExpenseService } from "../services/expense.service";
import { GroupService } from "../services/group.service";

export async function addExpense(request,response){
    const {name, cost} = request.body;
    const userId = request.user;
    const {groupId} = request.query;
    if (!name | !cost){
        response.status(400).json({
            message : 'Neki je slo narobe, oziroma neki manjka'
        })
        return;
    }
    const expense = await ExpenseService.createExpense(name, cost, userId, groupId);
    response.status(200).json({
        message : 'Use kul, uspesno ustvarjen expense',
        expense : expense
    })
    

}