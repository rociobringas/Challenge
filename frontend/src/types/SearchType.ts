export type SearchBarProps = {
    /** Llamado cuando el usuario dispara la búsqueda (enter o click). */
    onSearch: (term: string) => void;
    /** Valor inicial opcional. */
    initialValue?: string;
    /** Placeholder opcional. */
    placeholder?: string;
};