export interface Rol {
    readonly id?: string;
    readonly name: string;
    readonly composite: boolean;  
    readonly clientRole: boolean;
    readonly containerId: string;
}
