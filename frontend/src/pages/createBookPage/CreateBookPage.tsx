import { useNavigate } from "react-router-dom";
import * as bookApi from "../../services/Books";
import { BookForm } from "../../components/bookForm/BookForm";
import type { BookCardProps } from "../../types/BookCardType";
import "./CreateBookPage.css";
import { useEffect, useRef, useState } from "react";
import { Notification } from "../../components/notification/Notification";

export default function CreateBookPage() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState<string | null>(null);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (!notification) return;
        // auto-hide del toast
        const t = window.setTimeout(() => setNotification(null), 3000);
        return () => clearTimeout(t);
    }, [notification]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    async function handleSubmit(data: BookCardProps) {
        try {
            await bookApi.createBook(data);
            setNotification("Book created successfully");
            timerRef.current = window.setTimeout(() => navigate("/books"), 700);
        } catch (e) {
            const msg = (e as Error).message || "";
            setNotification(
                msg.toLowerCase().includes("already")
                    ? "This book already exists (same title & author)"
                    : "Error creating the book"
            );
        }
    }

    return (
        <>
            <main className="create-main">
                <h2 className="create-title">Add new book</h2>
                <div className="create-form">
                    <BookForm onSubmit={handleSubmit} />
                </div>
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