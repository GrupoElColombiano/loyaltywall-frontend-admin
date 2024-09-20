// Axios
import {api} from "../api";
export function refreshToken() {
    return api.post(
        "/keycloak/refresh-token",
        null,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
}

export function getUserById(id: string) { 
    return api.get(`/keycloak/users/${id}`);
}
