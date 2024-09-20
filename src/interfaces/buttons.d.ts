interface IButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
    type?: "button" | "submit" | "reset";
}