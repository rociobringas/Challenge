import type { BookCardProps } from "../../types/BookCardType";
import "./BookCard.css";

export function BookCard({ title, author, genre, synopsis, yearPublished }: BookCardProps) {
    return (
        <article className="book-card" aria-label={`${title} por ${author}`}>
            <div className="book-card__meta">
                <h3 className="book-card__title">{title}</h3>
                <p className="book-card__author">{author}</p>
                {genre && <p className="book-card__genre">{genre}</p>}
            </div>

            {synopsis && <p className="book-card__synopsis">{synopsis}</p>}

            {yearPublished && (
                <p className="book-card__year">Published in: {yearPublished}</p>
            )}
        </article>
    );
}