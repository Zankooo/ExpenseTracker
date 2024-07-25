//createGroup
//getGroupsForUser
//getGrupa

import axios from "../config/axios";

export async function createGroup(){
    const response = await axios.post("/groups/")
    console.log("Response" + response)
    if(response.data){
        console.log(response.data);

    }
    return response.data;
    
}


export async function getGrupa(){
    const response = await axios.get("/groups/group");
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



