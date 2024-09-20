// Axios
import axios from "axios";

// Interface
interface Credential {
    email: string;
    password: string;
}

export const SignInService = async (credential: Credential) => {
    // Base URL
    const BASE_URL: string = import.meta.env.VITE_BASE_URL;

    // Config
    const config = {
        headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Origin": "*",
        },
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/auth/login`,
            credential,
            config
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

