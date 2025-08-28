import type { Book } from "../types/BookType.ts";

const API_URL = import.meta.env.VITE_API_URL as string;

export async function getLibraryBooks(): Promise<Book[]> {
    return apiFetch<Book[]>(`${API_URL}/library`);
}

export async function addBookToLibrary(bookId: number): Promise<Book> {
    return apiFetch<Book>(`${API_URL}/library`, {
        method: "POST",
        body: JSON.stringify({ bookId }),
    });
}

export async function removeFromLibrary(bookId: number): Promise<Book> {
    return apiFetch<Book>(`${API_URL}/library/${bookId}`, { method: "DELETE" });
}

async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const res = await fetch(input, { headers: { "Content-Type": "application/json" }, ...init });
    // el init va a ser la accion que quiero hacer (post, delete, get)
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed with status ${res.status}`);
    }
    return res.json() as Promise<T>;
    // hago request de API y me lo devuelve ya como tipado Book
    // con esto la llamo en todas asi no tengo que chequear el stat en cada operacion
}