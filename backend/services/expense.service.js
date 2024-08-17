import {prisma} from "../config/prisma.js"

export class ExpenseService{

    static async createExpense(name, cost, userId, groupId){
        const expense = await prisma.expense.create({
            data : {
               name : name,
                cost : cost, 
                userId : userId,
                groupId : groupId
            }   
        })
        return expense;
    }


    


}