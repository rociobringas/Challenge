import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as bookApi from "../../services/Books";
import type { Book } from "../../types/BookType";
import { BookCard } from "../../components/bookCard/BookCard";
import "./BookDetailPage.css";

export default function BookDetailPage() {
    const { id } = useParams<{ id: string }>(); // fun de react que me agara el url, aca directo lo corto y me queda el id
    const [book, setBook] = useState<Book | null>(null); // guardo el libro que quiero ver en detail
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await bookApi.getBookById(Number(id)); // hago la busqueda por id
                setBook(data);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);


    if (loading) return <div className="detail-loading">Loading...</div>;
    if (!book) return <div className="detail-not-found">Book not found.</div>;

    return (
        <main className="detail-main">
            <div className="detail-header">
                <button onClick={() => navigate(-1)} className="detail-back">Back</button>
            </div>

            <BookCard
                title={book.title}
                author={book.author}
                genre={book.genre}
                synopsis={book.synopsis}
                yearPublished={book.yearPublished}
            />

            <button className="btn-ghost" onClick={() => navigate("/books")}>
                All books
            </button>
        </main>)
}