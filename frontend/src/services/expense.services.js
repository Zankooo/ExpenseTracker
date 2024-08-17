import axios from "../config/axios";

export async function addExpense(groupId){
    //sam nevem kaj dat v oklepaje
    const response = await axios.post(`/expense?groupId=${groupId}`);
    return response.data;
}



