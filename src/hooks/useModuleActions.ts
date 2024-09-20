// ReactJS
import { useCallback, useContext, useEffect, useState } from "react";

// Context
import { AuthContext } from "../context/AuthContext";

// Service
import { getModulesActionsByRole, updateModulesActionsByRole } from "../service/roles";

interface IModuleActions {
    createAt: Date;
    description: string;
    id: number;
    name: string;
    paywallModuleActionId: number;
    paywallModuleActionRelationId: null;
    paywallModuleId: null;
    role: null;
}

export default function useModuleActions(name?: string) {
    // Context
    const { modules, role } = useContext(AuthContext);

    // Constants
    const module = modules.find((module) => module.name.toLowerCase() === name?.toLowerCase());

    const moduleID = module?.id.toString() ?? "";

    // States
    const [moduleActions, setModuleActions] = useState<IModuleActions[]>([]);

    // Functions
    const handleUpdateModuleActions = useCallback((moduleID: string, actionID: string) => {        
        updateModulesActionsByRole(moduleID, actionID, role?.id ?? "")
            .then((res) => console.log(res?.data))
            .catch((err) => console.log(err));
    }, [role]);

    // Effects
    useEffect(() => {
        getModulesActionsByRole(moduleID, role?.name ?? "")
            .then((res) => {
                console.log("🚀 ~ .then ~ res:", res);
                setModuleActions(res?.data);})
            .catch((err) => console.log(err));
    }, [moduleID, role, handleUpdateModuleActions]);    

    return { module: moduleActions, handleUpdateModuleActions };
}
