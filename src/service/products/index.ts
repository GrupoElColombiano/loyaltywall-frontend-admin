// Axios
import {api} from "../api";

export function getProducts() {
    return api.get("/product/list");
}

export const getProductsBySite = (idSite: number) => {
    return api.get(`/product/filter-product?idSite=${idSite}`);
};

export function getProduct(id: string) {
    return api.get(`/product/${id}`);
}

export function createProduct(data: any) {
    return api.post("/product/create", data);
}

export function updateProduct(id: number, data: any) {
    return api.put(`/product/edit/${id}`, data);
}
