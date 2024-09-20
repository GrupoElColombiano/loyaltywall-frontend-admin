import axios from "axios";
// import {api} from "../api";

export const getListSites = async ( callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = "/sites/list";
  
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true"
        }
    };

    try {
        const response = await axios.get(`${BASE_URL}${ENDPOINT}`, config);
        callback(response);
    } catch (error) {
        callback(error);
        // console.error('Error list product', error);
    }
};

export const getListSitesPagination  = async (page: number, limit: number, name: string, callback: { (result: any): void; (arg0: unknown): void; }, isActive?: boolean): Promise<void> => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = `/sites/filter-pagination?page=${page}&limit=${limit}&name=${name}${isActive !== undefined ? `&isActive=${isActive}` : `&isActive=${""}`}`;
  
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true"
        }
    };

    try {
        const response = await axios.get(`${BASE_URL}${ENDPOINT}`, config);
        callback(response);
    } catch (error) {
        callback(error);
        // console.error('Error list product', error);
    }
};

export const getSiteById = async(idSite: number, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = `/sites/select/${idSite}`;

    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true"
        }
    };

    try {
        const response = await axios.get(`${BASE_URL}${ENDPOINT}`, config);
        callback(response);
    } catch (error) {
        callback(error);
        // console.error('Error select product', error);
    }
};

export const assignSiteToRol = async(jsonObject : any, idrol: number, siteIds: Array<any>, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    // :role/sites/create
    const ENDPOINT = `/roles/${idrol}/sites/create`;

    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true",
            Authorization: `Bearer ${jsonObject}`
        }
    };

    try {
        const response = await axios.post(`${BASE_URL}${ENDPOINT}`, siteIds, config);
        callback(response);
    } catch (error) {
        callback(error);
        // console.error('Error select product', error);
    }
};

export const editSitesByRol = async(jsonObject : any, idrol: number, siteIds: Array<any>, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const ENDPOINT = `/roles/${idrol}/sites/update`;

    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true",
            Authorization: `Bearer ${jsonObject}`
        }
    };

    try {
        const response = await axios.put(`${BASE_URL}${ENDPOINT}`, siteIds, config);
        callback(response);
    } catch (error) {
        callback(error);
        // console.error('Error select product', error);
    }
};