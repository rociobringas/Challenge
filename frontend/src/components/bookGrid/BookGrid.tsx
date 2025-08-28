import type { Book } from "../../types/BookType";
import { BookCard } from "../bookCard/BookCard";
import "./BookGrid.css";

type BookWithFlag = Book & { inLibrary?: boolean };

type BookGridProps = {
    books: BookWithFlag[];
    onSelect?: (book: BookWithFlag) => void | Promise<void>;
    onActionFor?: (
        book: BookWithFlag
    ) => { label: string; onClick: (book: BookWithFlag) => void | Promise<void> } | undefined;
};

// src/components/bookGrid/BookGrid.tsx
export function BookGrid({ books, onSelect, onActionFor }: BookGridProps) {
    if (!books || books.length === 0) return <p>No books found.</p>;

    return (
        <section className="book-grid" role="list" aria-label="Libros">
            {books.map((b) => {
                const action = onActionFor?.(b);
                return (
                    <article key={b.id} className="book-grid__item" role="listitem">
                        <button
                            type="button"
                            className="book-grid__body"
                            onClick={() => onSelect?.(b)}
                            aria-label={`Ver detalle de ${b.title}`}
                        >
                            <BookCard
                                title={b.title}
                                author={b.author}
                                genre={b.genre}
                                synopsis={b.synopsis}
                                yearPublished={b.yearPublished}
                            />
                        </button>

                        <div className="book-grid__footer">
                            {action ? (
                                <button
                                    type="button"
                                    className="book-grid__action"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        action.onClick(b);
                                    }}
                                >
                                    {action.label}
                                </button>
                            ) : (
                                <span className="book-grid__spacer" aria-hidden="true" />
                            )}
                        </div>
                    </article>
                );
            })}
        </section>
    );
}