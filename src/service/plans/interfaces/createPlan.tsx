export interface CreatePlan {
    readonly idPlan: number | undefined | null;
    readonly userType: string;
    readonly isActive: boolean;
    readonly name: string;
    readonly description: string;  
    readonly idVersionPlan: number;
    readonly categories: Array<CategoryProduct | null | undefined>;
    readonly rates: Array<any>;
}

export interface CategoryProduct {
    sites: number;
    idProduct: number;
    idCategory: number;
    duration: number;
    typeDuration: string;
    frequency: string;
    unlimited: boolean;
    amount: number;
}