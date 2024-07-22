import axios from "../config/axios";

export async function register(data){
    const response = await axios.post("/auth/register", data);
    console.log("Response: " + response)
    if (response.data){
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));

    }
    return response.data;
}

export async function login(data){
    const response = await axios.post("/auth/login", data);
    if (response.data){
        localStorage.setItem("user", JSON.stringify(response.data.user))

    }
    return response.data;
}

