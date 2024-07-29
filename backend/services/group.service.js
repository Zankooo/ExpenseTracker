import {prisma} from "../config/prisma.js"

export class GroupService {

    // dve funkciji: create in get

    static async createGroup(name, adminId, description){
        const group = await prisma.group.create({
            data: {
                name: name,
                description: description,
                admin: {
                  connect: {
                    id: adminId
                  }
                }
              }
        });
        return group;
    }

    static async getGroup(groupId){
        const group = await prisma.group.findFirst({
            where: {
                groupId : groupId
            }
        });
        return group;
    }

    static async getGroupsForUser(userId){
        const userWithGroups = await prisma.user.findFirst({
            where: { id : userId },
            include: { groups : true },
          });
        
          return userWithGroups.groups;
    }


}




  // name, description