interface IAuthProviderProps {
    children: React.ReactNode;
}

interface IAuthContext {
    accessToken: string;
    changeExpiredToken: (value: boolean) => void;
    changeRole: (role: IRole) => void
    clientAccessToken?: string;
    expiredToken: boolean;
    handleUpdateModules: (index: number) => void;
    modules: IModuleRole[];
    role: IRole | null;
    user: User | null;
}

interface IRole {
    id: string;
    name: string;
    description: string;
    composite: boolean;
    clientRole: boolean;
    containerId: string;
}
