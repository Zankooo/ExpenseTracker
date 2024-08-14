import {prisma} from "../config/prisma.js"

export class GroupService {

    // dve funkciji: create in get

    static async createGroup(name, adminId, description){
        const group = await prisma.group.create({
            data: {
                name: name,
                description: description,
                members: { create: [{ userId: adminId, isAdmin: true}] },
              }
        });
        return group;
    }

    static async getGroup(groupId){
        const group = await prisma.group.findFirst({
            where: {
              id : groupId
            }
        });
        return group;
    }

    static async getGroupsForUser(userId) {
        const userWithGroups = await prisma.userGroup.findMany({
            where: { userId : userId },
            include: { group : true },
          });
        const groups = userWithGroups.map(userGroup => userGroup.group);
        return groups;
    }

    static async isMember(userId, groupId) {
      const existingMember = await prisma.userGroup.findFirst({
        where: {
          userId: userId,
          groupId: groupId
        }
      })
      return existingMember;
    }

    static async addUser(userId, groupId) {
      await prisma.userGroup.create({
        data : {
          userId : userId,
          groupId : groupId,
          isAdmin : false
        }
      })
    }
}




  // name, description