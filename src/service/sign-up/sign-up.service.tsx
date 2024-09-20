import axios from "axios";

export interface UserData {
  readonly firstName: string;
  readonly lastName: string;
  readonly identificationType: string;
  readonly identificationNumber: string;
  readonly email: string;
  readonly password: string;
  readonly celular: number;
  readonly confirmPassword?: number;
}

export const createUser = async (userData: UserData): Promise<void> => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true",
        },
    };

    try {
        await axios.post(`${BASE_URL}/users/sig-up`, userData, config);
    } catch (error) {
        console.error("Error creating user:", error);
    }
};
