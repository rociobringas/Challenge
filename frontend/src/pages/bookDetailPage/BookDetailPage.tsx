import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as bookApi from "../../services/Books";
import type { Book } from "../../types/BookType";
import "./BookDetailPage.css";

export default function BookDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await bookApi.getBookById(Number(id));
                setBook(data);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);


    if (loading) return <div className="detail-loading">Cargando…</div>;
    if (!book) return <div className="detail-not-found">Libro no encontrado.</div>;

    return (
        <main className="detail-main">
            <div className="detail-header">
                <button onClick={() => navigate(-1)} className="detail-back">← Volver</button>
            </div>

            <h2 className="detail-title">{book.title}</h2>
            <p className="detail-subtitle">
                <strong>Autor:</strong> {book.author}
            </p>

            <section className="detail-body">
                <div className="detail-cover" aria-label="Portada del libro" />

                <div className="detail-meta">
                    <div className="detail-badges">
                        {book.genre && <span className="detail-badge">Género: {book.genre}</span>}
                        {book.yearPublished && <span className="detail-badge">Año: {book.yearPublished}</span>}
                        <span className="detail-badge">ID: {book.id}</span>
                    </div>

                    {/* Campos destacados */}
                    <div className="detail-field">
                        <span className="detail-label">Título</span>
                        <span className="detail-value">{book.title}</span>
                    </div>

                    <div className="detail-field">
                        <span className="detail-label">Autor</span>
                        <span className="detail-value">{book.author}</span>
                    </div>

                    {book.genre && (
                        <div className="detail-field">
                            <span className="detail-label">Género</span>
                            <span className="detail-value">{book.genre}</span>
                        </div>
                    )}

                    {book.yearPublished && (
                        <div className="detail-field">
                            <span className="detail-label">Año de publicación</span>
                            <span className="detail-value">{book.yearPublished}</span>
                        </div>
                    )}

                    {book.synopsis && (
                        <div className="detail-synopsis">
                            {book.synopsis}
                        </div>
                    )}

                    <div className="detail-actions">
                        <button className="btn-ghost" onClick={() => navigate("/books")}>
                            Ver todos
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}