export interface CreateCategory {
    readonly idCategory?: number;
    readonly product?: number;
    readonly idProduct?: number;
    readonly idSite?: number;
    readonly site?: number;
    readonly name: string;
    readonly description: string;  
    readonly rules?: string;
}
