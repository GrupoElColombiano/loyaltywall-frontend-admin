interface IInputSearch {
    onSearch: () => void;
    search: string;
    setSearch: (value: string) => void;
}