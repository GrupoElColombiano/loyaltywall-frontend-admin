// Axios
import axios from "axios";

// Interfaces
import { CreateProduct} from "../products/interfaces/createProduct";

// Services
import {api} from "../api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const create = async (createProduct: CreateProduct, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

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
        const response = await axios.post(`${BASE_URL}/product/create`, createProduct, config);
        callback(response);
    } catch (error) {
        callback(error);
        console.error("Error creating user:", error);
    }
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const edit = async (createProduct: CreateProduct, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

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
        const response = await axios.put(`${BASE_URL}/product/edit/`+createProduct.idProduct, createProduct, config);
        callback(response);
    } catch (error) {
        callback(error);
        console.error("Error creating user:", error);
    }
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getListCategories = async (searchText: string, page: number, limit: number, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    let ENDPOINT = `/product/filter-pagination?name=${searchText}&page=${page}&limit=${limit}`;

    if( searchText == ""){
        ENDPOINT = `/product/filter-pagination?name=&page=${page}&limit=${limit}`;
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


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getListProductsAll = async (callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = "/product/list";

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
export const getProducts = () => {
    return api.get("/product/list");
};

export const getProductsBySite = (idSite: number) => {
    return api.get(`/product/filter-product?idSite=${idSite}`);
};
export const getSites = () => {
    return api.get("/sites/list");
};

export const getCategories = (idSite: number, idProduct?: number) => {
    return api.get(`/product/filter-product?idSite=${idSite}${idProduct !== undefined ? `&idProduct=${idProduct}` : ""}`);
};

export const getProductsById = async(idProduct: number, callback: { (result: any): void; (arg0: unknown): void; }): Promise<void> => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const ENDPOINT = `/product/select/${idProduct}`;

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