// Axios
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});


export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

