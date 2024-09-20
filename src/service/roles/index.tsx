// Axios
import {api} from "../api";

export function getRoles(token?: string) {
    return api.get("/keycloak/roles/list", { headers: { Authorization: `Bearer ${token}` } });
}

export function getRolesByUser(token?: string, role?: string) {
    return api.get(`/keycloak/users/${role}/list`, { headers: { Authorization: `Bearer ${token}` } });
}

export function getSitesByRol(token?: string, role?: string) {
    return api.get(`/roles/${role}/sites/list`, { headers: { Authorization: `Bearer ${token}` } });
}

export function getModulesByRole(role: string) {
    return api.get(`/access-modules/active-modules/role/${role}`);
}

export function getModulesActionsByRole(id: string, role: string) { 
    return api.get(`/access-modules/moduleaction/${id}/${role}`);
}

export function updateModulesByRole(id: string, role: string, isActive: string) {
    return api.put(`/access-modules/moduleaction/${id}/${role}/${isActive}`);
}

export function updateModulesActionsByRole(id: string, actionId: string, role: string) {
    return api.put(`/access-modules/rolemoduleaction/${id}/${actionId}/${role}`, {});
}

export function getRolesPagination(page: number, limit: number, idSite?: number | string, token?: string, search?: string) {
    return api.get(`/keycloak/roles/filter-pagination?&search=${search}&page=${page}&limit=${limit}&idSite=${idSite}`, { headers: { Authorization: `Bearer ${token}` } });
}