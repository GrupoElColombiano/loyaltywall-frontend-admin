// Axios
import {api} from "../api";

// Servicio para el controlador findPointValueBySite
export function getPointValueBySite(idSite: number) {
    return api.get(`/gamification/point_value/${idSite}`);
}

// Servicio para el controlador updatePointValueBySite
export function updatePointValueBySite(idSite: number, data: {point_value: number}) {
    return api.put(`/gamification/point_value/${idSite}`, data);
}

// Servicio para el controlador createNewExpireTimeAndDeactivateCurrent
export function createNewExpireTimeAndDeactivateCurrent(siteId: number, data: { expireTime: number }) {
    return api.post(`/gamification/expire_time_point/create/${siteId}`, data);
}

// Servicio para el controlador listActiveExpireTimePointsBySiteId
export function getListActiveExpireTimePointsBySiteId(siteId: number) {
    return api.get(`/gamification/active_expire_time/${siteId}`);
}

// Servicio para el controlador findAllEvent
export function getAllEvent() {
    return api.get("/gamification/event/findAll");
}

// Servicio para el controlador findEventsWithPoints
export function getEventsWithPoints(idSite: number) {
    return api.get(`/gamification/event/withPoints/${idSite}`);
}

// Servicio para el controlador updateEventPoints
export function updateEventPoints(id_event: number, data: {points: number}) {
    return api.put(`/gamification/eventPoints/edit/${id_event}`, data);
}

// Servicio para el controlador removeEvent
export function removePointEvent(id_event: number, id_site: number) {
    return api.put(`/gamification/event/restart_points/${id_event}/${id_site}`);
}

// Servicio para el controlador createEventPonderation
export function createEventPonderation(data: any) {
    return api.post("/gamification/event/create", data);
}

// Servicio para el controlador updateEventPonderation
export function updateEventPonderation(id_event: number, data: any) {
    return api.put(`/gamification/event/edit/${id_event}`, data);
}

export function getOneCluesterEvent(idEvent: number, idSite: number) {
    return api.get(`/gamification/cluster_events/${idEvent}/${idSite}`);
}

export function updateOneCluesterEvent(idCluster: number, data: any) {
    return api.put(`/gamification/cluster_events/${idCluster}`, data);
}

export function deleteOneCluesterEvent(idCluster: number, idEvent: number) {
    return api.delete(`/gamification/cluster_events/${idCluster}/${idEvent}`);
}

export function updateEventWithPoint(idEvent: number, data: any) {
    return api.put(`/gamification/event/edit/${idEvent}`, data);
}

export function updateClusterPenalization(data: any) {
    return api.put("/gamification/cluster_penalization/update", data);
}

export function getClusterPenalization(idSite: number) {
    return api.get(`/gamification/cluster_penalization/${idSite}`);
}
