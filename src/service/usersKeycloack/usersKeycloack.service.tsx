// @Get('users/:role/list')
// async listUserByRol(
//   @Headers('Authorization') tokenAccess: string,
//   @Param('role') role: any,
// ): Promise<any> {
//   return await this.keycloackService.findUsersByRole(tokenAccess, role);
// }

import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getListUsersByRol = async (jsonObject: any, roleName: string, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    
    const ENDPOINT = `/keycloak/users/${roleName}/list`;
    
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true",
            Authorization: `Bearer ${jsonObject}`
        },
        
    };

    const URL = `${BASE_URL}${ENDPOINT}`;
    console.log({ URL });
    try {
        const response = await axios.get(URL, config);
        callback(response);
    } catch (error) {
        callback(error);
        // console.error('Error list product', error);
    }
};

export const getRolesByUser = async (jsonObject : any, userId : string, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {
    
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    
    const ENDPOINT = `/keycloak/roles/${userId}/list`;
    
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

export const getSitesByRol = async (jsonObject : any, role : string, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {
    
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = `/roles/${role}/sites/list`;
    
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

export const editUsers = async (jsonObject : any, user : any, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {
    
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = `/keycloak/users/edit/${user.sub}`;
    const data = {
        firstName: user.firstName,
        lastName: user.lastName
    };
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
        const response = await axios.put(`${BASE_URL}${ENDPOINT}`, data, config );
        callback(response);
    } catch (error) {
        callback(error);
        // console.error('Error list product', error);
    }
};

export const loginClient = async (callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {
    
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = "/keycloak/final-user/token";
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true",
        },
    };

    try {
        const response = await axios.post(`${BASE_URL}${ENDPOINT}`, null, config );
        callback(response);
    } catch (error) {
        callback(error);
        //console.error("Error login client", error);
    }
};

export const getUsersListClientsPagination = async (
    tokenAccess: any, 
    query: { search?: string; enabled?: string; page?: string; limit?: string, role?: string },
    callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {
    
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    // const ENDPOINT = `/keycloak/final-users/filter-pagination?${query.search !== undefined ? `search=${query.search}` : ""}${query.enabled !== undefined ? `&enabled=${query.enabled}` : ""}${query.page !== undefined ? `&page=${query.page}` : ""}${query.limit !== undefined ? `&limit=${query.limit}` : ""}`;

    const baseEndpointCut = "/keycloak/final-users/filter-pagination";
    const queryParams = [];

    if (query.search !== undefined) {
        queryParams.push(`search=${query.search}`);
    }

    if (query.enabled !== undefined) {
        queryParams.push(`enabled=${query.enabled}`);
    }

    if (query.page !== undefined) {
        queryParams.push(`page=${query.page}`);
    }

    if (query.limit !== undefined) {
        queryParams.push(`limit=${query.limit}`);
    }

    if (query.role !== undefined) {
        queryParams.push(`role=${query.role}`);
    }
    
    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    const ENDPOINT = baseEndpointCut + queryString;

    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true",
            Authorization: `Bearer ${tokenAccess}`
        },
    };

    try {
        const response = await axios.get(`${BASE_URL}${ENDPOINT}`, config );
        callback(response);
    } catch (error) {
        callback(error);
        // console.error('Error list product', error);
    }
};