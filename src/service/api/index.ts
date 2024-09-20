// Axios
import axios from "axios";

const BASE_URL_API = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL_API,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

export default api;
