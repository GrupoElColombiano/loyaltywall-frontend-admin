interface INavLinks {
    name: string;
    title: string;
    path: string;
    icon: React.ReactNode;
}

interface INavLinksProps {
    paywallmoduleid: number;
    id: number;
    name: string;
    description: string;
    createAt: Date;
    idRole: string;
    isActive: boolean;
    title: string;
    path: string;
    icon: React.ReactNode;
}