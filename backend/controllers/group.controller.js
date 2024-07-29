//kjer rabis user id dobis iz request.user
//group
import { GroupService } from "../services/group.service.js";

export async function createGroup(request, response){
    
    const {name, description} = request.body;
    const adminId = request.user;

    if(!name | !description){
        response.status(400).json({
            message: "Name ali description nam manjka"
        })
        return;
    }
    

    const group = await GroupService.createGroup(name, adminId, description);

    response.status(200).json({
        message : "Grupa uspešno ustvarjena",
        group : group
    })


}

export async function getGrupa(request, response){
    const {groupId} = request.query;
    const group = await GroupService.getGroup(groupId)
    response.status(200).json({
        group
    })
    return;
}

export async function getGroupsForUser(request,response){
    const userId = request.user;
    const groups = await GroupService.getGroupsForUser(userId);
    response.status(200).json({
        groups
    })
    return;
}

