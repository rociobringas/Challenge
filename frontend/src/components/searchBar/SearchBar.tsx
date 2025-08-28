import { useState } from "react";
import "./SearchBar.css";

type SearchBarProps = {
    onSearch: (q: string) => void;
    initial?: string;
    placeholder?: string;
    instant?: boolean;
    delayMs?: number;
};

export function SearchBar({
                              onSearch,
                              initial = "",
                              placeholder = "Search book...",
                          }: SearchBarProps) {
    const [term, setTerm] = useState(initial);


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSearch(term.trim()); // ejecuta la funcion q le pasan
    }

    return (
        <form className="searchbar" onSubmit={handleSubmit}>
            <input
                className="searchbar__input"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder={placeholder}
                aria-label="Search books"
            />
            <button className="searchbar__button" type="submit">
                Search
            </button>
        </form>
    );
}