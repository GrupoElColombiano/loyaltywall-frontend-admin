import axios from "axios";

import { CreateCategory } from "./interfaces/createCategory";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const create = async (createCategory: CreateCategory, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

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
        const response = await axios.post(`${BASE_URL}/category/create`, createCategory, config);
        callback(response);
    } catch (error) {
        callback(error);
        console.error("Error creating user:", error);
    }
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const edit = async (createProduct: CreateCategory, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

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
        const response = await axios.put(`${BASE_URL}/category/update/`+createProduct.idCategory, createProduct, config);
        callback(response);
    } catch (error) {
        callback(error);
        console.error("Error creating user:", error);
    }
};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getListCategories = async (searchText: string, page: number, limit: number, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    let ENDPOINT = `/category/filter-pagination?name=${searchText}&page=${page}&limit=${limit}`;

    if( searchText == ""){
        ENDPOINT = `/category/filter-pagination?name=&page=${page}&limit=${limit}`;
    }
  
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

