interface ICardComponentProps {
    children: React.ReactNode;
    description: string;
    icon?: React.ReactNode;
    title: string;
    width?: number | string;
}

interface ICardInfo {
    children: React.ReactNode;
    description: string;
    icon?: React.ReactNode;
    title: string;
    width?: string | number;
}