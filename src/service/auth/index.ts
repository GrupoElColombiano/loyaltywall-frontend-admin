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

export function getUserById(id: string, access_token: string) { 
    const urlBase = import.meta.env.VITE_BASE_URL;
    return fetch(`${urlBase}/keycloak/users/${id}`, { 
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        }
     })
     .then(fetchResponse => fetchResponse.json())
     .then(response => response)
     .catch(err => {
        console.log("❌ error ❌ ", err);
     });
}
