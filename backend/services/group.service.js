import { prisma } from "../config/prisma.js";

export class GroupService {
  // dve funkciji: create in get

  static async createGroup(name, adminId, description) {
    const group = await prisma.group.create({
      data: {
        name: name,
        description: description,
        members: { create: [{ userId: adminId, isAdmin: true }] },
      },
    });
    return group;
  }

  static async getGroup(groupId) {
    const group = await prisma.group.findFirst({
      where: {
        id: groupId,
      },
    });
    return group;
  }

  static async getGroupsForUser(userId) {
    const userWithGroups = await prisma.userGroup.findMany({
      where: { userId: userId },
      include: { group: true },
    });
    const groups = userWithGroups.map((userGroup) => userGroup.group);
    return groups;
  }

  static async isMember(userId, groupId) {
    const existingMember = await prisma.userGroup.findFirst({
      where: {
        userId: userId,
        groupId: groupId,
      },
    });
    return existingMember;
  }

  static async addUser(userId, groupId) {
    await prisma.userGroup.create({
      data: {
        userId: userId,
        groupId: groupId,
        isAdmin: false,
      },
    });
  }

  static async getMembers(groupId) {
    const groups = await prisma.userGroup.findMany({
      where: {
        groupId: groupId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    const members = groups.map((group) => {
      return { username: group.user.username, isAdmin: group.isAdmin };
    });
    return members;
  }

  static async getExpenses(groupId) {
    const expenses = await prisma.expense.findMany({
      where: { groupId: groupId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });
    return expenses;
  }

  static async getTotalCost(groupId) {
    const total = await prisma.expense.aggregate({
      where: { groupId: groupId },
      _sum: {
        cost: true,
      },
    });
    return total;
  }

  static async getTotalByMember(groupId) {
    const result2 = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      select: {
        members: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
                expenses: {
                  where: {
                    groupId: groupId,
                  },
                  select: {
                    cost: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const totalByUser = result2.members.map((obj) => ({
      user: { username: obj.user.username, userId: obj.user.id },
      cost: obj.user.expenses.reduce((sum, { cost }) => sum + cost, 0),
    }));

    return totalByUser;
  }
}
