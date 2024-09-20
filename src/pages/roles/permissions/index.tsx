// ReactJS
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, Fragment } from "react";

// MUI
import { Divider, Switch, Typography } from "@mui/material"; // Grid

// Shared
import NavHeader from "../../../shared/components/NavHeader";

// Services
import { Action } from "../../../service/assign-permissions/interfaces2/action";
import { getListModulesRol, getPaywallModuleAction, setUpdatePaywallModuleAction, setUpdatePaywallModuleActionRelation } from "../../../service/assign-permissions/assign-permissions.service";
import { Module } from "../../../service/assign-permissions/interfaces2/module";
import { Rol } from "../../../service/assign-permissions/interfaces2/rol";

// Constants
import { NavLinks } from "../../../constants/routes";

// Styled
import { ItemContainer, ItemContent, ListContainer, PermissionsContainer } from "./styled";

export default function AssignPermissions() {
    // Translation
    const { t } = useTranslation();

    // LocalStorage
    const rolStorage = localStorage.getItem("rol");

    // Location
    const location = useLocation();
    const { data: role } = location.state;

    // States
    const [modules, setModules] = useState<Module[]>([]);
    const [modulesActions, setModulesActions] = useState<Action[]>([]);

    const [selectedModuleId, setSelectedModuleId] = useState(0); 

    const [rolCurrent, setRolCurrent] = useState<Rol | null>(null);

    // Functions 
    const handlePageChange = () =>{
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if((rolStorage != null) ){
            const jsonObject = JSON.parse(rolStorage);
            setRolCurrent(jsonObject);

            getListModulesRol(jsonObject.id, (result) => {
                if(result.code == "ERR_BAD_REQUEST"){
                    setModules([]);
                    return;
                }

                if(result.status == 200){
                    const newModules = result.data.map((module: any) => {
                        const moduleFound = NavLinks.find((navLink) => navLink.name === module.name);
                        return {
                            ...module,
                            icon: moduleFound?.icon,
                            title: moduleFound?.title,
                        };
                    });

                    setModules(newModules);
                    return;
                }
        
            });
        }
    };

    const handleModuleAction = (params: {moduleId: number,  rol: string }) => {
        //  setLimit(params.limitCurrent);
        //  setPage(params.page);
        setSelectedModuleId(params.moduleId);
        getPaywallModuleAction(params.moduleId, params.rol, (result) => {
  
            if(result.code == "ERR_BAD_REQUEST"){
                setModulesActions([]);
                return;
            }

            if(result.status == 200){
                setModulesActions(result.data);
                return;
            }
  
        });
    };

    const handleSwitchChangeModules = (index: number, moduleId: number) => {
        
        const updatedModules = [...modules];
        updatedModules[index].isActive = !updatedModules[index].isActive;
        setModules(updatedModules);

        setUpdatePaywallModuleAction(""+moduleId, ""+rolCurrent?.id, ""+updatedModules[index].isActive, (result) => {
            
            if (result.code == "ERR_BAD_REQUEST") {
                setModulesActions([]);
                // setTotalProducts(0);
                return;
            }

            if (result.status == 200) return;
        });
         
    };

    const handleSwitchChange = (index: number) => {
        const updatedModulesActions = [...modulesActions];
    
        // Si role es null o vacío, establece el valor en "2"; de lo contrario, ponlo en vacío.
        updatedModulesActions[index].role = updatedModulesActions[index].role === null || updatedModulesActions[index].role === "" ? "2" : "";
        
        setModulesActions(updatedModulesActions);

        setUpdatePaywallModuleActionRelation(
            ""+ selectedModuleId, 
            ""+updatedModulesActions[index].id,
            ""+rolCurrent?.id,  (result) => {
            
                if(result.code == "ERR_BAD_REQUEST"){
                    setModulesActions([]);
                    return;
                }

                if(result.status == 200) return;  
            }
        );
    };  

    // Effects
    useEffect(() => {
        handlePageChange();
    }, []);       

    return (
        <PermissionsContainer>
            <NavHeader title={t("Roles.configuration.back")} isBack />

            <ItemContainer>
                <Typography variant="h5">
                    {t("Roles.configuration.permissions")}: {role?.name}
                </Typography>
                <Divider />
                <Typography variant="body1">
                    {t("Roles.configuration.permissions.description")}
                </Typography>
            </ItemContainer>

            <ListContainer>
                <ItemContainer>
                    {modules.map((module, index) => (
                        <Fragment key={module?.name}>
                            {index !== 0 && <Divider />}
                            <ItemContent
                                isHoverable
                                isPointer
                                onClick={() => handleModuleAction({moduleId: module?.id, rol: `${rolCurrent?.id}`})}
                                selected={module?.id === selectedModuleId}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                    {module?.icon}
                                    <Typography variant="body1">
                                        {t(module?.name)}
                                    </Typography>
                                </div>
                                <Switch checked={module?.isActive} onChange={() => handleSwitchChangeModules(index, module?.id)} />
                            </ItemContent>
                        </Fragment>
                    ))}
                </ItemContainer>
                <ItemContainer>
                    <ItemContainer>
                        {modulesActions?.map((module, index) => (
                            <ItemContent key={module.id} style={{ justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-start" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <Switch 
                                        checked={module.role !== null && module.role !== ""}
                                        onChange={() => handleSwitchChange(index)}
                                    />
                                    <Typography variant="body1">
                                        {t(module?.description)}
                                    </Typography>
                                </div>
                                <Typography variant="body1" style={{ marginLeft: "10px" }}>
                                    {t(module?.name)}
                                </Typography>
                            </ItemContent>
                        ))}
                    </ItemContainer>                
                </ItemContainer>
            </ListContainer>
        </PermissionsContainer>
    );
}
