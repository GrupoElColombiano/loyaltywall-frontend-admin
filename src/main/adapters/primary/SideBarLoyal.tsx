// ReactJS
import { useLocation, useNavigate } from "react-router-dom";
import { useState} from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Tooltip } from "@mui/material";

// Assets
import longIcon from "../../../assets/longIcon.png";
import reducedIcon from "../../../assets/reducedIcon.png";


import { getModulesActionsByRole } from "../../../service/roles";

interface MenuItemSidebarProps {
    collapsed: boolean;
    icon: React.ReactNode;
    path: string;
    title: string;
    idModule: number;
}

function MenuItemSidebar({ collapsed, icon, path, title, idModule }: MenuItemSidebarProps) {
    // Get the current location
    const location = useLocation();   
  
    //  const [actions, setActions] = useState<IActionRole[]>([]);
    // const { actions } = useContext(AuthContext);
    // Check if the menu item is active based on the current URL

    const activo = (path != null ? location?.pathname.split("/")[1] === path.split("/")[1] : "");

    // Translation
    const { t } = useTranslation();

    // State for showing/hiding the tooltip
    const [showTooltip, setShowTooltip] = useState(false);

    // Navigation function
    const navigate = useNavigate();

    // Handle mouse enter event to show the tooltip
    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    // Handle mouse leave event to hide the tooltip
    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    // Handle click event to navigate to the URL destination
    const itemIsSelected = () => {

        const roleStorage = window.localStorage.getItem("rolUser");

        if (roleStorage){

            const jsonRol = JSON.parse(roleStorage);
            getModulesActionsByRole(`${idModule}`, jsonRol?.id) .then((res) => {
                localStorage.setItem(`${idModule}`,  JSON.stringify(res.data));
                console.log("🚀 ~ getModulesActionsByRole ~ res:", res);
                navigate(path);
            }).catch((error) => {
                console.log(error);
            });
        }
        
    };

    return (
        <div
            onClick={itemIsSelected}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ alignItems: "center", display: "flex", gap: "12px", justifyContent: "center", padding: "0px 12px 0px 0px", width: "100%" }}
        >
            <div style={{ width: "4px", height: "56px", background: activo ? "#0045FF" : "", borderRadius: "2px" }} />

            <div
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#BFD0FF";
                    e.currentTarget.style.color = "#0045FF";
                    e.currentTarget.style.cursor = "pointer";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = activo ? "#BFD0FF" : "";
                    e.currentTarget.style.color = activo ? "#0045FF" : "#606A84";
                }}
                style={{
                    alignItems: "center",
                    background: activo ? "#BFD0FF" : "",
                    borderRadius: "8px",
                    color: activo ? "#0045FF" : "#606A84",
                    display: "flex",
                    height: "48px",
                    justifyContent: "center",                 
                    padding: "5px",
                    transition: "background 0.3s ease",
                    width: collapsed ? "238px" : "48px",
                }}
            >
                <Tooltip arrow open={showTooltip} title={collapsed ? "" : t(title)} placement="right">
                    <div style={{ display: "flex", gap: "12px", width: "100%", marginLeft: "12px" }}>
                        {icon}                
                        <span style={{ marginInlineEnd: collapsed ? "auto" : "0px", transition: "opacity 0.3s ease", opacity: collapsed ? 1 : 0 }}>
                            {collapsed && t(title)}
                        </span>
                    </div>
                </Tooltip>
            </div>
        </div>
    );
}

export default function SideBarLoyal({ pages }: { pages: INavLinksProps[] }) {
    // State
    const [collapsed, setCollapsed] = useState(false);

    // Functions
    const handleMouseEnter = () => {
        setCollapsed(true);
    };
    
    const handleMouseLeave = () => {
        setCollapsed(false);
    };

    return (
        <aside
            onMouseLeave={handleMouseLeave}
            style={{
                backgroundColor: "#FDFDFD",
                borderRadius: "0px 24px 0px 0px",     
                height: "100vh",
                transition: "width 0.3s ease",
                width: collapsed ? "278px" : "88px",
                flexShrink: 0
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "0px 24px 0px 0px",
                    height: "80px",
                    background: "linear-gradient(133.16deg, #FF2E59 2.56%, #0045FF 101.21%)",
                }}
            >
                <img                    
                    onMouseEnter={handleMouseEnter}
                    src={collapsed ? longIcon : reducedIcon}
                    style={{ width: collapsed ? "156px" : "24px", height: "36px", transition: "width 0.3s ease" }}
                />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px", gap: "12px" }}>
                {pages?.map((page, index) => (

                    <MenuItemSidebar
                        collapsed={collapsed}
                        icon={page.icon}
                        key={index}
                        path={page.path}
                        title={page.title}
                        idModule={page.paywallmoduleid}
                    />
                ))}
            </div>
        </aside>
    );
}
