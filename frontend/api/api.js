import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:4000"
    }
})