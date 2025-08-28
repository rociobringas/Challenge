import { useState, type FormEvent } from "react";
import type {SearchBarProps} from "../../types/SearchType.ts";
import "./SearchBar.css";


export function SearchBar({ onSearch, initialValue = "", placeholder = "Search..." }: SearchBarProps) {
    const [value, setValue] = useState(initialValue);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSearch(value.trim());
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                aria-label="Search"
            />
            <button type="submit">Search</button>
        </form>
    );
}