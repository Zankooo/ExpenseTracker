//createGroup
//getGroupsForUser
//getGrupa
import axios from "../config/axios";

export async function createGroup(data){
    const response = await axios.post("/groups/", data);
    console.log("Response" + response)
    if(response.data){
        console.log(response.data);
    }
    return response.data;
}

export async function getGrupa(groupId){
    const response = await axios.get(`/groups/group?groupId=${groupId}`);
    if(response.data){
        console.log(response.data);
    }
    return response.data;
}

export async function getGroupsForUser(){
    const response = await axios.get("/groups/userGroups");
    if(response.data){
        console.log(response.data);
    }
    return response.data;
}

export async function addUser(userId, groupId){
    const response = await axios.post(`/groups/invite?userId=${userId}?groupId=${groupId}`);
    return response.data;
}



