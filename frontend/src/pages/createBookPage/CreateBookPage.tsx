import { useNavigate } from "react-router-dom";
import * as bookApi from "../../services/Books";
import { BookForm } from "../../components/bookForm/BookForm";
import type { BookCardProps } from "../../types/BookCardType";
import "./CreateBookPage.css";

export default function CreateBookPage() {
    const navigate = useNavigate();

    async function handleSubmit(data: BookCardProps) {
        try {
            await bookApi.createBook(data);
            navigate("/books");
        } catch (e) {
            alert("Error al crear el libro");
        }
    }

    return (
        <main className="create-main">
            <h2 className="create-title">Crear libro</h2>
            <div className="create-form">
                <BookForm onSubmit={handleSubmit} />
            </div>
        </main>
    );
}