interface IPlan {
    idVersionPlan:         number;
    idPlan:                number;
    description:           string;
    name:                  string;
    userType:              string;
    isActive:              boolean;
    createdAt:             Date;
    updatedAt:             Date;
    rates:                 Rate[];
    site:                  Site;
    plansProductsCategory: PlansProductsCategory[];
}

interface PlansProductsCategory {
    idPlansProductCategory: number;
    product:                Product;
    sites:                  Site;
    categorysAccess:        any[];
}

interface Product {
    idProduct:   number;
    name:        string;
    description: string;
    isActive:    boolean;
    all_product: boolean;
    createdAt:   Date;
    updatedAt:   Date;
}

interface Site {
    idSite:      number;
    name:        string;
    description: string;
    url:         string;
    isActive:    boolean;
    createAt:    Date;
    updateAt:    Date;
}

interface Rate {
    id:                   number;
    time:                 string;
    rate:                 string;
    rate_special:         string;
    rate_special_renewal: string;
    rate_renewal:         string;
    duration:             number;
    is_special:           boolean;
    date_start:           null;
    date_end:             null;
    index?: number;
}