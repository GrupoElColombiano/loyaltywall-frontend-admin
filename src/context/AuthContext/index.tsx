// ReactJS
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "react-oidc-context";

// Services
import { getModulesByRole, updateModulesByRole } from "../../service/roles";
import {api}  from "../../service/api";

// Constants
import { NavLinks } from "../../constants/routes";

// Interfaces
import { type User } from "oidc-client-ts";
import { loginClient } from "../../service/usersKeycloack/usersKeycloack.service";

export const AuthContext = createContext<IAuthContext>({
    accessToken: "",
    changeExpiredToken: (expiredToken: boolean) => void expiredToken,
    changeRole: (role: IRole) => void role,
    clientAccessToken: "",
    expiredToken: false,
    handleUpdateModules: (index: number) => void index,
    modules: [],
    role: null,
    user: null,
});

export function AuthProvider({ children }: IAuthProviderProps) {
    // KeyCloak
    const { user: userKeyCloak } = useAuth();
    // States
    const [user, setUser] = useState<User | null>(userKeyCloak || null);

    const [accessToken, setAccessToken] = useState<string>(userKeyCloak?.access_token || "");

    const [clientAccessToken, setClientAccessToken] = useState<string>("");

    const [role, setRole] = useState<IRole>(() => {
        const roleStorage = window.localStorage.getItem("rolUser");
        console.log('RoleStorage', roleStorage)
        if (roleStorage) return JSON.parse(roleStorage);
    });

    const [modules, setModules] = useState<IModuleRole[]>([]);

    const [expiredToken, setExpiredToken] = useState<boolean>(false);

    // Functions
    const handleUpdateModules = useCallback((index: number) => {
        const updatedModules = [...modules];

        updatedModules[index].isActive = !updatedModules[index].isActive;

        setModules(updatedModules);

        updateModulesByRole(updatedModules[index].id.toString(), role?.id, updatedModules[index].isActive.toString())
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [modules, role]);

    const changeExpiredToken = useCallback((expiredToken: boolean) => {
        setExpiredToken(expiredToken);
    }, []);

    // Effects
    useEffect(() => {
        if (userKeyCloak) {
            setUser(userKeyCloak);
            setAccessToken(userKeyCloak.access_token);

            localStorage.setItem("user", JSON.stringify(userKeyCloak));
            localStorage.setItem("access_token", userKeyCloak.access_token);
        }
    }, [userKeyCloak]);

    useEffect(() => {

        /*getModulesByRole(role?.id).then(async (res) => {
            const modulePromises = res?.data.map(async (module: any) => {
                let updatedModule = { ...module };
    
                try {
                    const actionsResponse = await getModulesActionsByRole(`${module.paywallmoduleid}`, role?.id);
                    updatedModule.actions = actionsResponse.data;
                } catch (error) {
                    console.log(error);
                }
    
                const navLink = NavLinks.find((navLink) => navLink.name === module.name);
                if (navLink) {
                    updatedModule = { ...updatedModule, ...navLink };
                }
    
                return updatedModule;
            });
    
            const updatedModules = await Promise.all(modulePromises);
    
            setModules(updatedModules);
        }).catch((error) => {
            console.log(error);
        });*/

        getModulesByRole(role?.id)            
            .then((res) => {
                console.log('Data de la API', role)
                const modulesWithNavLinks = res?.data.map((module: any) => {
                    const navLink = NavLinks.find((navLink) => navLink.name === module.name);

                    if (navLink) {
                        return { ...module, ...navLink };
                    }
                    return module;
                });

                setModules(modulesWithNavLinks);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [role]);

    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    }, [accessToken]);

    useEffect(() => {
        
        const handleLoginResult = (result : any) => {
            if (result.code === "ERR_BAD_REQUEST") {
                console.error("Error: " + result.response.data.message);
            } else if (result.status === 201) {
                setClientAccessToken(result.data.access_token);
            }
        };
        const usersModules = modules.filter((modul) => modul.name === "Users");
        
        if (usersModules.length > 0) {
            loginClient(handleLoginResult);
        }

    }, [modules]);

    // Memo
    const authValue = useMemo(() => ({
        accessToken: accessToken,
        changeExpiredToken: changeExpiredToken,
        changeRole: setRole,
        clientAccessToken: clientAccessToken,
        expiredToken: expiredToken,
        handleUpdateModules: handleUpdateModules,
        modules: modules,
        role: role,
        user: user,
    }), [accessToken, handleUpdateModules, modules, role, user, clientAccessToken]);      

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
}
