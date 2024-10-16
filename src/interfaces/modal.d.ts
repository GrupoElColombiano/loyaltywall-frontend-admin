interface INewPlan {
    product:    Product;
    categories: Category[];
}

interface Category {
    amount:     number;
    duration:   number;
    idCategory: number;
    limited:    boolean;
    name:       string;
}

interface Product {
    value: number;
    label: string;
}


interface IModalProps {
    open: boolean;
    handleClose: () => void;
    idPlan: string;
    roleName: string;
}

interface IModalDataProps {
    modal: {
        cluster?: {
            id: number;
            percentage: number;
        }
        data: any;
        open: boolean;
    }
    setModal: (data: any) => void;
    editData?:  any;
    planId?: string;
    index?: number;
    handleConfirmToken?: (accessToken: any) => void; // Nuevo
    handleRefresh?: () => void; // Nuevo
    name?: string;
    description?: string;
    setPlanId?: (id: string) => void;
    setEditData: (args: any) => void;
}

interface IModalPayPal {
    open: boolean;
    data: {
        apiKey: string;
        clientId: string;
        testMode: boolean;
    } | null;
}

interface IModalEvertec {
    open: boolean;
    data: {
        apiKey: string;
        clientId: string;
        testMode: boolean;
    } | null;
}

interface IModalPointState {
    open: boolean;
    data: {
        amount: number;
    } | null;
}

interface IModalEventPonderationState {
    open: boolean;
    data: IEventPonderation[];
}

interface IEventPonderation {
    id_event:         number;
    name:             string;
    description:      string;
    points:           number;
    event_repeats:    number;
    porcentual_value: number;
    create_at:        Date;
    update_at:        Date;
    value?:            number;
}

interface IModalEventPonderatioExpirationState {
    open: boolean;
    data: {
        days: string;
    };
}

interface IModalClusterPenalizationState {
    open: boolean;
    data: {
        limitTime: number | null;
    } | null;
}

interface IModalPointsExpirationState {
    open: boolean;
    data: {
        days: number;
    } | null;
}

interface IModalPlanProduct {
    open: boolean;
    data: INewPlan[];
}

interface IModalPlanRate {
    open: boolean;
    data: [];
}
