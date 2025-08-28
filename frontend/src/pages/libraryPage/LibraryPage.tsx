import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as libraryApi from "../../services/Library";
import type { Book } from "../../types/BookType";
import { BookGrid } from "../../components/bookGrid/BookGrid";
import "./LibraryPage.css";

export default function LibraryPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => { void (async () => {
        setLoading(true);
        try { setBooks(await libraryApi.getLibraryBooks()); }
        finally { setLoading(false); }
    })(); }, []);

    async function handleRemove(book: Book) {
        await libraryApi.removeFromLibrary(book.id);
        setBooks(prev => prev.filter(b => b.id !== book.id));
    }

    if (loading) return <div className="library-loading">Loading books...</div>;

    return (
        <main className="library-main">
            <header className="library-header">
                <span className="library-count">{books.length}</span>
            </header>

            {books.length === 0 ? (
                <div className="library-empty">
                    There are no books <Link to="/books">Search book</Link>
                </div>
            ) : (
                <div className="library-grid">
                    <BookGrid
                        books={books}
                        onSelect={(b) => navigate(`/books/${b.id}`)}
                        onActionFor={() => ({
                            label: "Delete",
                            onClick: handleRemove,
                        })}
                    />
                </div>
            )}
        </main>
    );
}