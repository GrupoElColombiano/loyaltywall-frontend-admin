// ReactJS
import { useContext, useMemo } from "react";

// Context
import { AuthContext } from "../../context/AuthContext";

// Components
import { HeaderAuth, SideBarLoyal } from "../../main/adapters/primary";

// Styled
import { AppContent, HeaderContent } from "./styled";



export default function AppContainer({ children }: { children: React.ReactNode }) {
    // Context
    const { modules } = useContext(AuthContext);

    // Constants
    const activeModules = useMemo(() => modules.filter((module) => !module.isActive), [modules]);  

    return (
        <AppContent id="app">
            <SideBarLoyal pages={activeModules} />

            <HeaderContent>
                <HeaderAuth />
                {children}
            </HeaderContent>
        </AppContent>
    );
}
