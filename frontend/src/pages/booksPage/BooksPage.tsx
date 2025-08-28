import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as bookApi from "../../services/Books";
import * as libraryApi from "../../services/Library";
import type { Book } from "../../types/BookType";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { BookGrid } from "../../components/bookGrid/BookGrid";
import { Notification } from "../../components/notification/Notification";


export default function BooksPage() {
    const [books, setBooks] = useState<(Book & { inLibrary?: boolean })[]>([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState(""); // aca guardo la palabra que pongo en search bar
    const navigate = useNavigate();
    const [notification, setNotification] = useState<string | null>(null);


    async function load() {
        setLoading(true);
        try {
            const [allBooks, myLibrary] = await Promise.all([
                q ? bookApi.getBooks({ search: q }) : bookApi.getBooks(),
                // traigo todos los libros, si q esta vacio traigo todos,
                // y si tiene algo, solo traigo los que cumplan con q en la search bar
                libraryApi.getLibraryBooks() // agarro estos tmb para poder sacar el boton de add
            ]);

            const idsInLibrary = new Set(myLibrary.map(b => b.id));
            // hago set para busqueda mas rapida
            const merged = allBooks.map(b => ({ ...b, inLibrary: idsInLibrary.has(b.id) }));
            // agrego in library flag

            setBooks(merged); // actualizo estado
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load();  }, [q]);

    async function handleAddToLibrary(book: Book) {
        try {
            await libraryApi.addBookToLibrary(book.id);
            setNotification(`Added to library: ${book.title}`);
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

    if (loading) return <p style={{ padding: 24 }}>Loading books...</p>;

    return (
        <>
            <main className="books-main">
                <h2 className="books-title">Books</h2>
                <SearchBar onSearch={setQ} initial={q} />
                <BookGrid
                    books={books} // estos son los que agarre en el load
                    onSelect={(b) => navigate(`/books/${b.id}`)}
                    // si cliqueo me voy a book detail page de ese id
                    onActionFor={(b) =>
                        // si tiene promise, y muestra el boton
                        !b.inLibrary
                            ? { label: "Add to my library", onClick: handleAddToLibrary }
                            : undefined
                    }
                />
                {books.length === 0 && <p>There are no books.</p>}
            </main>

            {notification && (
                <Notification
                    message={notification}
                    type={notification.startsWith("Error") ? "error" : "success"}
                />
            )}
        </>
    );
}