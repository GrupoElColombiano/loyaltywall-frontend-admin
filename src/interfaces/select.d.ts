interface IOption {
    label: string;
    value: string | number | undefined;
    idProduct: number;
}

interface IInputSelect {
    item: string | number | undefined;
    onChange: (e: any) => void;
    label: string;
    options: IOption[];
    style?: React.CSSProperties;
    disabled?: boolean;
}