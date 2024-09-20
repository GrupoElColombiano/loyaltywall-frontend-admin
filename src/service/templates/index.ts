// Axios
import { api } from "../api";

interface ITemplate {
    description: string;
    html: string;
    isActive: boolean;
    name: string; 
    published: boolean;
    idSite: string;
}

// All Templates
export const getAllTemplates = (name: string, page: number, limit: number, idSite: number) => {
    return api.get(`/template-manager/findAll?name=${name}&page=${page}&limit=${limit}&idSite=${idSite}`);
};

/**
 * Get One Template
 * @param {String} id - Template ID
*/
export const getOneTemplate = (id: string) => {
    return api.get(`/template-manager/findOne/${id}`);
};

/**
 * Create Template
 * @param {Object} data - Template Data
*/
export const createTemplate = (data: ITemplate | any) => {
    return api.post("/template-manager/create", data);
};

/**
 * Update Template
 * @param {String} id - Template ID
 * @param {Object} data - Template Data
*/
export const updateTemplate = (id: string, data: ITemplate) => {
    return api.put(`/template-manager/update/${id}`, data);
};

/**
 * Get Plans
 * @param {Object} params - Query Params
*/
export const getPlans = (name: string, page: number, limit: number, rate?: string, site?: string) => {
    return api.get(`/plans/filter?name=${name}&page=${page}&limit=${limit}&rate=${rate}&idSite=${site}`);
};

/**
 * Get Versions Plan
 * @param {String} id - Plan ID
*/
export const getVersionsPlan = (id: string) => {
    return api.get(`versions_plan/list/${id}`);
};

// Get Sites
export const getSites = () => {
    return api.get("/sites/list");
};

export const createTemplateWithPlans = (data: any) => {
    return api.post("/plans/plan-template/create", data);
};


export const updateIsActive = (id: string, data: any) => {
    return api.patch(`/template-manager/${id}/activate`, data);
};