import { useEffect, useState } from "react";
import "./SearchBar.css";

type SearchBarProps = {
    onSearch: (q: string) => void;        // qué hacer cuando buscás
    initial?: string;                     // valor inicial (opcional)
    placeholder?: string;                 // placeholder (opcional)
    instant?: boolean;                    // true = busca mientras tipeás (debounced)
    delayMs?: number;                     // delay del debounce (default 300ms)
};

export function SearchBar({
                              onSearch,
                              initial = "",
                              placeholder = "Buscar…",
                              instant = false,
                              delayMs = 300,
                          }: SearchBarProps) {
    const [term, setTerm] = useState(initial);

    // Buscar mientras tipeás (debounce)
    useEffect(() => {
        if (!instant) return;
        const t = setTimeout(() => onSearch(term.trim()), delayMs);
        return () => clearTimeout(t);
    }, [instant, term, delayMs, onSearch]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();                     // <- clave para que no recargue la página
        onSearch(term.trim());
    }

    return (
        <form className="searchbar" onSubmit={handleSubmit}>
            <input
                className="searchbar__input"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder={placeholder}
                aria-label="Buscar libros"
            />
            <button className="searchbar__button" type="submit">
                Buscar
            </button>
        </form>
    );
}