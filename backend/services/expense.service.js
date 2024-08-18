import { prisma } from "../config/prisma.js";
import { GroupService } from "./group.service.js";

export class ExpenseService {
  static async createExpense(name, cost, userId, groupId) {
    const expense = await prisma.expense.create({
      data: {
        name: name,
        cost: cost,
        userId: userId,
        groupId: groupId,
      },
    });
    return expense;
  }
  static async simplifyDebt(groupId) {
    const members = await GroupService.getMembers(groupId);
    const totalByMember = await GroupService.getTotalByMember(groupId);
    const expensi = await GroupService.getExpenses(groupId);
    const total = expensi.reduce(function (sum, { cost }) {
      return sum + cost;
    }, 0);
    const fairShare = total / members.length;
    const netBalance = totalByMember.map(function (member) {
      return { ...member, netBalance: member.cost - fairShare };
    });

    netBalance.sort(function (a, b) {
      return a.netBalance - b.netBalance;
    });

    const transactions = [];
    let i = 0; // start (debtor)
    let j = netBalance.length - 1; // end (creditor)

    while (i < j) {
      const amount = Math.min(
        -netBalance[i].netBalance,
        netBalance[j].netBalance
      );
      netBalance[i].netBalance += amount;
      netBalance[j].netBalance -= amount;

      transactions.push({
        from: netBalance[i],
        to: netBalance[j],
        amount: amount.toFixed(2),
      });

      if (netBalance[i].netBalance === 0) i++;
      if (netBalance[j].netBalance === 0) j--;
    }

    return transactions.map((transaction) => ({
      from: transaction.from.user,
      to: transaction.to.user,
      amount: transaction.amount,
    }));
  }
}
