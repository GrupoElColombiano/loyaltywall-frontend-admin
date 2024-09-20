// Axios
import {api} from "../api";

export function getCategories(search?: string, page?: number, limit?: number, idProduct?: number | string, idSite?: number) {
    return api.get(`/category/filter-pagination?name=${search}&page=${page}&limit=${limit}&idProduct=${idProduct}&idSite=${idSite}`);
}

export function createCategory(data: any) {
    return api.post("/category/create", data);
}

export function updateCategory(id: number, data: any) {
    return api.put(`/category/update/${id}`, data);
}
