// ReactJS
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth, hasAuthParams } from "react-oidc-context";
import { useContext, useEffect } from "react";

// Context
import { AuthContext } from "./context/AuthContext";

// Pages
import AssignPermissionsPage  from "./pages/roles/permissions";
import CategoriesPage  from "./pages/categories/categories";
import ChangePassword from "./pages/changePassword/change-password.index";
import Custom404Page from "./pages/404/404";
import EdiSitePage from "./pages/sites/edit";
import EditCategoryPage  from "./pages/categories/edit";
import EditPlanPage from "./pages/plans/edit";
import EditProductPage from "./pages/products/edit";
import EditTemplate from "./pages/templates/edit";
import GamificationPage from "./pages/gamification/gamification";
import HistoryPage from "./pages/payment-methods/history";
import Home from "./pages/home/home";
import ListUsers from "../src/pages/usersPage/list-users/list-users";
import NewCategoryPage  from "./pages/categories/new";
import NewPlanPage from "./pages/plans/new";
import NewProductPage from "./pages/products/new";
import NewSitePage from "./pages/sites/new";
import NewTemplate from "./pages/templates/new";
import PaymentMethodsPage from "./pages/payment-methods/payment-methods";
import PlansPage from "./pages/plans/plans";
import ProductsPage  from "./pages/products/products";
import ProfileClientPage from "./pages/usersAdminPage/detail-client";
import ProfilePage from "./pages/profile/profile";
import RecoverPassword from "./pages/user/recover-password/recover-password.index";
import RolesPage  from "./pages/roles/roles";
import RolesUsersPage from "./pages/roles/users";
import SitesPage from "./pages/sites/sites";
import TemplatePage from "./pages/templates/template";
import UsersClientsPage from "./pages/usersAdminPage/list-users/list-clients";
import VersionsPlan from "./pages/plans/versions";
import ViewPlanPage from "./pages/plans/view";

// Containers
import AppContainer from "./containers/appContainer";

// Shared
import Loader from "./shared/components/Loader";

// Styles
import "./App.css";

export default function App() {
    // Auth
    const auth = useAuth();

    // Context
    const { expiredToken } = useContext(AuthContext);

    // Navigation
    const navigate = useNavigate();
 
    // Effects
    useEffect(() => {
        console.log(" App.tsx VITE_OIDC_AUTHORITY::: ", import.meta.env.VITE_OIDC_AUTHORITY);
        console.log(" App.tsx VITE_OIDC_CLIENT_ID::: ", import.meta.env.VITE_OIDC_CLIENT_ID);
        console.log(" App.tsx VITE_OIDC_POST_LOGOUT_REDIRECT_URI::: ", import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI);
        console.log(" App.tsx VITE_OIDC_REDIRECT_URI::: ", import.meta.env.VITE_OIDC_REDIRECT_URI);
        console.log(" App.tsx VITE_BASE_URL::: ", import.meta.env.VITE_BASE_URL);


        if (!hasAuthParams() && !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading) {
            auth.signinRedirect();
        }
    }, [auth]);

    useEffect(() => {
        if (expiredToken) {
            navigate("/404");
        }
    }, [expiredToken, auth]);   

    if (auth.isLoading) return <Loader />;

    return (    
        <AppContainer>                
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/404" element={<Custom404Page />} />

                <Route path="/payment-methods/*">
                    <Route path="" element={<PaymentMethodsPage />} />
                    <Route path="history" element={<HistoryPage />} />
                </Route>

                <Route path="/gamification" element={<GamificationPage />} />

                <Route path="/categories/*">
                    <Route path="" element={<CategoriesPage />} />
                    <Route path="edit/:idCategory/:idProduct" element={<EditCategoryPage />} />
                    <Route path="new" element={<NewCategoryPage />} />
                </Route> 
                   
                <Route path="/plans/*">
                    <Route path="" element={<PlansPage />} />
                    <Route path="edit/:planId" element={<EditPlanPage />} />
                    <Route path="new" element={<NewPlanPage />} />
                    <Route path="versions/:planId" element={<VersionsPlan />} />
                    <Route path="view/:planId" element={<ViewPlanPage />} />
                    <Route path="view/:planId/:versionId" element={<ViewPlanPage />} />
                </Route>
 
                <Route path="/roles/*">
                    <Route path="" element={<RolesPage />} />
                    <Route path="permissions" element={<AssignPermissionsPage />} />
                    <Route path="users" element={<RolesUsersPage />} />
                </Route>
 
                <Route path="/products/*">
                    <Route path="" element={<ProductsPage />} />
                    <Route path="edit/:id" element={<EditProductPage />} />
                    <Route path="new" element={<NewProductPage />} />
                </Route>

                <Route path="/profile/*">
                    <Route path="" element={<ProfilePage />} />
                    <Route path="changePassword" element={<ChangePassword />} />
                </Route>

                <Route path="/sites/*">
                    <Route path="" element={<SitesPage />} />
                    <Route path="userRoles" element={<ListUsers />} />
                    <Route path="edit/:idSites" element={<EdiSitePage />} />
                    <Route path="new" element={<NewSitePage />} />
                </Route>                    
                    
                <Route path="/templates/*">
                    <Route path="" element={<TemplatePage />} />
                    <Route path="edit/:id" element={<EditTemplate />} />
                    <Route path="new" element={<NewTemplate />} />
                </Route>
                    
                <Route path="/users/*">
                    <Route path="" element={<UsersClientsPage />} />
                    <Route path="details" element={<ProfileClientPage />} />
                    <Route path="recover-password" element={<RecoverPassword />} />
                </Route>
            </Routes>
        </AppContainer>
    );
}
