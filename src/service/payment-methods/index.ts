// Axios
import { api } from "../api";

export function getPaymentMethods(idSite: string) {
    return api.get(`/payment/findAll?idSite=${idSite}`);
}

export function getHistoryPaymentMethods(idSite: string, search: string, payment: string) {
    return api.get(`/registerlog/${idSite}/findAllPaymentTransaction?name=${search}&payment=${payment}`);
}

export function updateCredentials(idSite: string, data: any) {
    // return api.put(`/payment/update?idSite=${idSite}`, data);
    return api.post(`/payment/create/${idSite}`, data);
}
