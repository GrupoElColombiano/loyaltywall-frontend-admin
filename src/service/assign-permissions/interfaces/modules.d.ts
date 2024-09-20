interface IModuleRole {
    createAt: Date;
    description: string;
    icon: React.ReactNode;
    id: number;
    idRole: string;
    isActive: boolean;
    name: string;
    path: string;
    title: string;
    actions: IActionRole[];
    paywallmoduleid: number;
}
