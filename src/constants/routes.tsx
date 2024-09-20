// Icons
import {
    AdminPanelSettingsOutlined,
    ArticleOutlined,
    CategoryOutlined,
    CreditCardOutlined,
    GroupsOutlined,
    Inventory2Outlined,
    ViewCarouselOutlined,
    WebOutlined,
    WorkspacesOutlined
} from "@mui/icons-material";

export const NavLinks: INavLinks[] = [
    {
        name: "Administración de roles",
        title: "Roles.title",
        path: "/roles",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        name: "Administración de Sitios",
        title: "Sites.title",
        path: "/sites",
        icon: <WebOutlined />,
    },
    {
        name: "Usuarios",
        title: "Users.title",
        path: "/users",
        icon: <GroupsOutlined />,
    },
    {
        name: "Productos",
        title: "Products.title",
        path: "/products",
        icon: <Inventory2Outlined />,
    },
    {
        name: "Categorías",
        title: "Categories.title",
        path: "/categories",
        icon: <CategoryOutlined />,
    },
    {
        name: "Planes",
        title: "Plan.title",
        path: "/plans",
        icon: <ArticleOutlined />,
    },
    {
        name: "Plantillas",
        title: "Templates.title",
        path: "/templates",
        icon: <ViewCarouselOutlined />,
    },
    {
        name: "Administración de puntos & Gamificación",
        title: "Gamification.title",
        path: "/gamification",
        icon: <WorkspacesOutlined />,
    },
    {
        name: "Metodos de pago",
        title: "PaymentMethods.title",
        path: "/payment-methods",
        icon: <CreditCardOutlined />,
    },

];
