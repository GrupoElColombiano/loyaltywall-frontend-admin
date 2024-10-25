// Axios
import {api, apiClient} from "../api";

export function getAllSites() {
    return api.get("/sites/list");
}

export function getSites(page: number, limit: number, name: string, isActive: boolean | undefined) {
    return api.get(`/sites/filter-pagination?page=${page}&limit=${limit}&name=${name}${isActive !== undefined ? `&isActive=${isActive}` : `&isActive=${""}`}`);
}

export function getSite(id: string) {
    return api.get(`/sites/${id}`);
}

export function createSite(data: any) {
    return api.post("/sites/create", data);
}

export function updateSite(id: number, data: any) {
    return api.patch(`/sites/${id}`, data);
}

export function authenticationClient() {
    return apiClient.post("/users/authenticate");
}
