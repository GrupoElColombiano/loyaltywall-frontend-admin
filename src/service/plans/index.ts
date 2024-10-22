// Axios
import {api} from "../api";

// Get all plans
export function getPlans() {
    return api.get("/plans");
}

// Get plan by id
export function getPlanById(id: string) {
    return api.get(`/plans/${id}`);
}

// Create plan
export function createPlan(data: any) {
    return api.post("/plans/create", data);
}

// Update plan
export function updatePlan(id: string, data: any) {
    return api.put(`/plans/${id}/update`, data);
}

// Update plan
export function setProductCategoriesPlan(params: any) {
    return api.post("/plans/product/categories", params);
}

// List plan
export function getProductsCategoriesPlan(planId: any) {
    return api.get(`/plans/products/categories/${planId}`);
}

export function getRatesByPlan(planId: any) {
    return api.get(`/rates/findRatesByPlan/${planId}`);
}

// eliminar categoria
export function removeCategorie(planId: number, idPlansProductCategory: number) {
    return api.delete(`/plans/product/categorie/${planId}/${idPlansProductCategory}`, {});
}

export function removeCategorieProduct(idProduct: string, idPlan: string) {
    console.log(`/plans/product/categorie/all/${idPlan}/${idProduct}`);
    return api.delete(`/plans/product/categorie/all/${idPlan}/${idProduct}`, {});
}


export function updateCategorieProduct(idPlansProductCategory: number, category: any) {
    console.log(`/plans/product/categorie/${idPlansProductCategory}`);
    return api.put(`/plans/product/categorie/${idPlansProductCategory}`, category);
}

export function updateStatePlan(idPlans: number, params: any) {
    console.log(`/plans/product/categorie/update-state/${idPlans}`);
    console.log(" params ", params);
    return api.put(`/plans/product/categorie/update-state/${idPlans}`, params);
}

