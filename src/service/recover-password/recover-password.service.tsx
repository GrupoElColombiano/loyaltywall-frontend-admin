import axios from "axios";

export interface RecoverData {
  readonly newPassword: string;
  readonly token: string;
}


export interface EmailData {
  mail: string,
  domine: string
}

export interface ConfirmCreateUserData {
  email: string,
  domine: string
}
 

export interface SendVerifyCodeData {
  readonly verificationCode: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChangePasswordS = async (recoverData: RecoverData, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true"
        }
    };

    try {
        const response = await axios.post(`${BASE_URL}/reset-password/${recoverData.token}`, recoverData, config);
        callback(response);
    } catch (error) {
        console.error("Error creating user:", error);
        callback(error);
    }
};
 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SendEmail = async (emailData: EmailData, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true"
        }
    };
  
    try {
        const response = await axios.post(`${BASE_URL}/email/reset-password`, emailData, config);
        callback(response);
    } catch (error) {
        console.error("Error creating user:", error);
        callback(error);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ConfirmCreateUser = async (confirmCreateUserData: ConfirmCreateUserData, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true"
        }
    };
  
    try {
        const response = await axios.post(`${BASE_URL}/email/confirm-create-user`, confirmCreateUserData, config);
        callback(response);
    } catch (error) {
        console.error("Error creating user:", error);
        callback(error);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SendVeriyCode = async (token:string, sendVerifyCodeData: SendVerifyCodeData, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true"
        }
    };

    try {
        const response = await axios.post(`${BASE_URL}/confirm-create-user/${token}`, sendVerifyCodeData, config);
        callback(response);
    } catch (error) {
        console.error("Error creating user:", error);
        callback(error);
    }
};


