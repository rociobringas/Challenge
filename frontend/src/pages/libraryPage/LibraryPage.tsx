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

    if (loading) return <div className="library-loading">Cargando tu biblioteca…</div>;

    return (
        <main className="library-main">
            <header className="library-header">
                <h2 className="library-title">Mi biblioteca</h2>
                <span className="library-count">{books.length}</span>
            </header>

            {books.length === 0 ? (
                <div className="library-empty">
                    Tu biblioteca está vacía. <Link to="/books">Buscar libros</Link>
                </div>
            ) : (
                <div className="library-grid">
                    <BookGrid
                        books={books}
                        onSelect={(b) => navigate(`/books/${b.id}`)}
                        onAction={{ label: "Quitar", onClick: handleRemove }}
                    />
                </div>
            )}
        </main>
    );
}