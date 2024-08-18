import axios from "../config/axios";

export async function addExpense(groupId, data){
    //sam nevem kaj dat v oklepaje
    const response = await axios.post(`/expense?groupId=${groupId}`, data);
    return response.data;
}



