import { Fragment } from "react";
import { BookCard } from "../bookCard/bookCard";
import type { Book } from "../../types/bookType";

type BookListProps = {
    books: Book[];
    onSelect?: (book: Book) => void;
};

export function BookList({ books, onSelect }: BookListProps) {
    if (!books || books.length === 0) {
        return <p>No books found.</p>;
    }

    return (
        <Fragment>
            {books.map((b) => (
                <div key={b.id} onClick={() => onSelect?.(b)}>
                    <BookCard
                        title={b.title}
                        author={b.author}
                        genre={b.genre}
                        synopsis={b.synopsis}
                        yearPublished={b.yearPublished}
                    />
                </div>
            ))}
        </Fragment>
    );
}