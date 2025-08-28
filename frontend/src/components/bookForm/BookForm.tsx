import { useState, type FormEvent } from "react";
import type {BookCardProps} from "../../types/BookCardType.ts";
import './BookForm.css'


type BookFormProps = {
    onSubmit: (data: BookCardProps) => void;
};

export function BookForm({ onSubmit }: BookFormProps) {
    const [form, setForm] = useState<BookCardProps>({
        title: "",
        author: "",
        genre: "",
        synopsis: "",
        yearPublished: 0,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "yearPublished" ? Number(value) : value
        }));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
            <input name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
            <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
            <textarea name="synopsis" value={form.synopsis} onChange={handleChange} placeholder="Synopsis" />
            <input
                name="yearPublished"
                type="number"
                value={form.yearPublished ?? ""}
                onChange={handleChange}
                placeholder="Year Published"
            />
            <button type="submit">Save</button>
        </form>
    );
}