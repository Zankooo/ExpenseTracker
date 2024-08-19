//createGroup
//getGroupsForUser
//getGrupa
import axios from "../config/axios";

export async function createGroup(data){
    const response = await axios.post("/groups/", data);
    return response.data;
}

export async function getGrupa(groupId){
    const response = await axios.get(`/groups/group?groupId=${groupId}`);
    return response.data;
}

export async function getGroupsForUser(){
    const response = await axios.get("/groups/userGroups");
    return response.data;
}

export async function addUser(userId, groupId){
    const response = await axios.post(`/groups/invite?userId=${userId}&groupId=${groupId}`);
    return response.data;
}

export async function getMembers(groupId) {
    const response = await axios.get(`/groups/members?groupId=${groupId}`);
    return response.data;
}

export async function getExpenses(groupId){
    const response = await axios.get(`/groups/expenses?groupId=${groupId}`)
    return response.data;
}

export async function getTotal(groupId) {
    const response = await axios.get(`/groups/total?groupId=${groupId}`)
    return response.data;
}

export async function getTotalByMember(groupId) {
    const response = await axios.get(`/groups/totalByMember?groupId=${groupId}`);
    return response.data;
}

export async function getReturns(groupId) {
    const response = await axios.get(`/groups/returns?groupId=${groupId}`);
    return response.data;
}


