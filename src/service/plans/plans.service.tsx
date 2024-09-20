import axios from "axios";
import { CreatePlan} from "./interfaces/createPlan";
import {api}  from "../../service/api";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const create = async (createPlan: CreatePlan, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const siteStorage = localStorage.getItem("siteUser");
    const siteJson = siteStorage ? JSON.parse(siteStorage) : {};
    const dataToSend = {
        ...createPlan,
        idSite: siteJson.idSite
    };
    
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Credentials": "true"
        }
    }; 
    
    try {
        const response = await axios.post(`${BASE_URL}/plans/create`, dataToSend, config);
        callback(response);
    } catch (error) {
        callback(error);
        console.error("Error creating user:", error);
    }
};

export const fetchDataModal = async (callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

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
        const response = await axios.get(`${BASE_URL}/usertype`, config);
        callback(response);
    } catch (error) {
        callback(error);
        console.error("Error creating user:", error);
    }
};

export const getListPlans = async (page: number, limit: number, name: string, planId : string, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const siteStorage = localStorage.getItem("siteUser");
    const siteJson = siteStorage ? JSON.parse(siteStorage) : {};


    let ENDPOINT = `/plans/filter-pagination?page=${page}&limit=${limit}&name=${name}&idSite=${siteJson.idSite}`;
  
    if(planId.length > 0){
        ENDPOINT += `&idPlan=${planId}`;
    } 

    console.log(" EL ENDPOINT DE PLANES ES ESTE ", ENDPOINT);
  
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

export const getPlanById = async (planId : string | undefined, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = `/plans/${planId}`;
  
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

export const getPlanVersion = async (page: number, limit: number, name: string, planId : string | undefined, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = `/plans/filter-version?page=${page}&limit=${limit}&name=${name}&planId=${planId}`;
  
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

export const getPlansRates = async () => {
    return await api.get("/plans/rates/list");
};

export const getPlanVersioning = async (idPlan: number) => {
    return await api.get(`/plans/paywall/plan/versioning/${idPlan}`);
};