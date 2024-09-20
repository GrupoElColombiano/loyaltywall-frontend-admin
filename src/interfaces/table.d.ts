interface ITableSkeleton {
    columnsNum: number;
    rowsNum: number;
}

interface IHeader {
    align?: "left"
    | "center" | "right" | "inherit" | "justify";
    key: string;
    label: string;
}

interface IRolesBody {
    clientRole: boolean;
    composite: boolean;
    containerId: string;
    description: string;
    id: string;
    name: string;
}

interface ISitesBody {
    createAt: string;
    description: string;
    idSite: number;
    isActive: boolean;
    name: string;
    updateAt: string;
    url: string;
}

interface IUsersBody {
    createAt: string;
    description: string;
    idSite: number;
    isActive: boolean;
    name: string;
    updateAt: string;
    url: string;
}

interface IProductsBody {
    createdAt: string; 
    description: string;
    all_product: boolean;
    idProduct: number;
    isActive: boolean;
    idCategory: number;
    name: string;
    updatedAt: string;
    productName: string
}

interface ICategoriesBody {
    description: string;
    idCategory: number;
    idProduct: number;
    idSite: number;
    name: string;
    productName: string;
    rules: string;
    siteName: string;
}

interface IPlansBody {
    createdAt: string;
    description: string;
    idPlan: number;
    idVersionPlan: number;
    isActive: boolean;
    name: string;
    updatedAt: string;
    userType: string;
}

interface ITemplatesBody {
    __v: number;
    _id: string;
    description: string;
    html: string;
    isActive: boolean;
    name: string;
    published: boolean;
}

interface IAssignPlansBody {
    idVersionPlan: number;
    idPlan: number;
    description: string;
    name: string;
    userType: string;
    isActive: boolean;
    rates: {
        date_end: string,
        date_start: string,
        duration: number,
        id: number;
        is_special: boolean,
        rate_renewal: number;
        rate_special_renewal: number;
        rate_special: number;
        rate: number;
        time: string
    }[],
    site: {
        idSite: number;
        name: string;
        description: string;
        url: string;
        isActive: boolean;
        createAt: string;
        updateAt: string;
    }
}

interface IGamificationBody {
    createAt: string;
    description: string;
    idSite: number;
    isActive: boolean;
    name: string;
    updateAt: string;
    url: string;
}

interface IRolesUsersBody {
    id: string;
    createdTimestamp: number;
    username: string;
    enabled: boolean;
    totp: boolean;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    email: string;
    disableableCredentialTypes: [];
    requiredActions: [
        "CONFIGURE_TOTP",
        "TERMS_AND_CONDITIONS",
        "UPDATE_PASSWORD",
        "UPDATE_PROFILE",
        "VERIFY_EMAIL"
    ]
    notBefore: number;
}

interface IRolesSitesBody {
    id: string;
    name: string;
}

interface IPaymentMethodsHistoryBody {
    id:        number;
    amount:    number;
    userId:  string;
    status:    boolean;
    createdAt: Date;
    gateway:   Gateway;
}

interface Gateway {
    id:        number;
    name:      string;
    clientId:  string;
    apiKey:    string;
    image:     string;
    createdAt: Date;
    updatedAt: Date;
    isActive:  boolean;
    testMode:  boolean;
}

interface IEventPonderationBody {
    id:                number;
    eventIdEvent:      number;
    siteIdSite:        number;
    points:            number;
    registration_date: Date;
    expiration_date:   Date;
    event:             Event;
}

interface Event {
    id_event:         number;
    name:             string;
    description:      string;
    points:           number;
    event_repeats:    number;
    porcentual_value: number;
    create_at:        Date;
    update_at:        Date;
}

interface IEventPenalizationBody {
    limitTime: number | null;
}

interface IEventExpirationBody {
    days: string;
}

interface IUsersClientsBody {
    firstName: string;
    email: string;
    subscription: string;
    userType: string;
    levelSubscription: string;
}

interface IEventClusters {
    id_event_cluster: number;
    event_repeats:    number;
    porcentual_value: number;
    events:           Event
    clusters:         Cluster;
}

interface Cluster {
    id_cluster: number;
    name:       string;
    create_at:  Date;
    update_at:  Date;
}

interface Event {
    id_event:         number;
    name:             string;
    description:      string;
    points:           number;
    event_repeats:    number;
    porcentual_value: number;
    create_at:        Date;
    update_at:        Date;
}

interface IRolesAssignSitesBody {
    id: string;
    name: string;
}

interface ICustomBody {
    handleClick: (item: any) => void;
    header: IHeader[];
    isLoading?: boolean;
    selected: any[];
    isSelected: (item: any) => boolean;
    module:
    "roles"
    | "assign-plan"
    | "categories"
    | "event-clusters"
    | "event-expiration"
    | "event-penalization"
    | "event-ponderation"
    | "gamification"
    | "payment-methods-history"
    | "plans"
    | "planVersions"
    | "products"
    | "roles-assign-sites"
    | "roles-sites"
    | "roles-users"
    | "sites"
    | "templates"
    | "users-clients"
    | "users";
    rows: any[] | any;
    setTableRows: any;
}

interface ITableComponent {
    children?: React.ReactNode;
    height?: string;
    isLoading?: boolean;
    isSelectable?: boolean;
    module:
    "roles"
    | "assign-plan"
    | "categories"
    | "event-clusters"
    | "event-expiration"
    | "event-penalization"
    | "event-ponderation"
    | "gamification"
    | "payment-methods-history"
    | "plans"
    | "planVersions"
    | "products"
    | "roles-assign-sites"
    | "roles-sites"
    | "roles-users"
    | "sites"
    | "templates"
    | "users-clients"
    | "users";
    selected?: any[];
    setSelected?: (selected: any[]) => void;
    tableHeader: IHeader[];
    tableRows: any[] | any;
    setTableRows?: any;
}