import type { Book } from "../../types/BookType";
import "./BookGrid.css";
type BookWithFlag = Book & { inLibrary?: boolean };


type BookGridProps = {
    books: BookWithFlag[];
    onSelect?: (book: BookWithFlag) => void;
    onActionFor?: (book: BookWithFlag) =>
        { label: string; onClick: (book: BookWithFlag) => void } | undefined;
};

export function BookGrid({ books, onSelect, onActionFor }: BookGridProps) {
    if (!books || books.length === 0) return <p>No books found.</p>;

    return (
        <section className="book-grid">
            {books.map((b) => {
                const action = onActionFor?.(b);
                return (
                    <div key={b.id} className="book-card">
                        <div onClick={() => onSelect?.(b)}>
                            <h3>{b.title}</h3>
                            <p>{b.author}</p>
                        </div>
                        {action && (
                            <button onClick={() => action.onClick(b)}>
                                {action.label}
                            </button>
                        )}
                    </div>
                );
            })}
        </section>
    );
}