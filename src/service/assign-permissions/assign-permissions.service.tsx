import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getListRoles = async (jsonObject: any, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = "/keycloak/roles/list";
    
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true",
            Authorization: `Bearer ${jsonObject}`
        },
    };

    try {
        const response = await axios.get(`${BASE_URL}${ENDPOINT}`, config);
        callback(response);
    } catch (error) {
        callback(error);
        // console.error('Error list product', error);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getListModulesRol = async (rol: string,   callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = `/access-modules/roles/${rol}`;
    
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true",
        },
        
    };

    try {
        const response = await axios.get(`${BASE_URL}${ENDPOINT}`, config);
        callback(response);
    } catch (error) {
        callback(error);
        // console.error('Error list product', error);
    }
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPaywallModuleAction = async (moduleId: number, role: string,   callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = `/access-modules/moduleaction/${moduleId}/${role}`;
   
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true",
        },
        
    };

    try {
        const response = await axios.get(`${BASE_URL}${ENDPOINT}`, config);
        callback(response);
    } catch (error) {
        callback(error);
        // console.error('Error list product', error);
    }
};


export const setUpdatePaywallModuleAction = async (moduleId: string, role: string, isActiveP: string, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

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
        const response = await axios.put(`${BASE_URL}/access-modules/moduleaction/`+moduleId+"/"+role+"/"+isActiveP, {}, config);
        callback(response);
    } catch (error) {
        callback(error);
        console.error("Error creating user:", error);
    }
};


// moduleId, ActionRelationId, role
export const setUpdatePaywallModuleActionRelation = async (moduleId: string, ActionRelationId: string, role: string, 
    callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

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
        const response = await axios.put(`${BASE_URL}/access-modules/rolemoduleaction/`+moduleId+"/"+ActionRelationId+"/"+role, {}, config);
        callback(response);
    } catch (error) {
        callback(error);
        console.error("Error creating user:", error);
    }
};
// /access-modules/rolemoduleaction/2/1/7ea7c209-b9d1-44c0-9f6f-0466761baea7

export const getAccesModulesByRol = async (jsonObject : any, roleId : string, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {
    
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = `/access-modules/roles/${roleId}`;
    
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true",
            Authorization: `Bearer ${jsonObject}`
        },
    };

    try {
        const response = await axios.get(`${BASE_URL}${ENDPOINT}`, config);
        callback(response);
    } catch (error) {
        callback(error);
        // console.error('Error list product', error);
    }
};