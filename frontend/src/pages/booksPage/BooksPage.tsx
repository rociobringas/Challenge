import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as bookApi from "../../services/Books";
import * as libraryApi from "../../services/Library";
import type { Book } from "../../types/BookType";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { BookGrid } from "../../components/bookGrid/BookGrid";
import {ErrorDisplay} from "../../components/errors/ErrorDisplay.tsx";


export default function BooksPage() {
    const [books, setBooks] = useState<(Book & { inLibrary?: boolean })[]>([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState("");
    const navigate = useNavigate();
    const [notification, setNotification] = useState<string | null>(null);


    async function load() {
        setLoading(true);
        try {
            const [allBooks, myLibrary] = await Promise.all([
                q ? bookApi.getBooks({ search: q }) : bookApi.getBooks(),
                libraryApi.getLibraryBooks()
            ]);

            const idsInLibrary = new Set(myLibrary.map(b => b.id));
            const merged = allBooks.map(b => ({ ...b, inLibrary: idsInLibrary.has(b.id) }));

            setBooks(merged);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); /* eslint-disable-next-line */ }, [q]);

    async function handleAddToLibrary(book: Book) {
        try {
            await libraryApi.addBookToLibrary(book.id);
            setNotification(`Añadido a tu biblioteca: ${book.title}`);
        } catch (e) {
            setNotification(`Error: ${(e as Error).message}`);
        }
        await load();
    }

    useEffect(() => {
        if (notification) {
            const t = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(t);
        }
    }, [notification]);

    if (loading) return <p style={{ padding: 24 }}>Cargando libros…</p>;

    return (
        <main className="books-main">
            <h2 className="books-title">Libros</h2>
            <SearchBar onSearch={setQ} initial={q} />
            <BookGrid
                books={books}
                onSelect={(b) => navigate(`/books/${b.id}`)}
                onActionFor={(b) =>
                    !b.inLibrary
                        ? { label: "Agregar a mi biblioteca", onClick: handleAddToLibrary }
                        : undefined
                }
            />
            {books.length === 0 && <p>No hay resultados.</p>}
            {notification && <ErrorDisplay message={notification} />}
        </main>
    );
}