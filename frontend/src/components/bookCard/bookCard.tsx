import "./features/books/ui/bookCard/bookCard.css";
import type {BookCardProps} from "../../types/bookType.ts";
import "./bookCard.css"

export function BookCard({ title, author, genre, synopsis, yearPublished }: BookCardProps) {
    return (
        <div className="book-card">
            <h2>{title}</h2>
            <p><strong>Author:</strong> {author}</p>
            {genre && <p><strong>Genre:</strong> {genre}</p>}
            {synopsis && <p>{synopsis}</p>}
            <p><strong>Year Published:</strong> {yearPublished}</p>
        </div>
    );
}

