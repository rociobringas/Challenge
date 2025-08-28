import type { Book } from "../types/BookType.ts";
import type {BookCardProps} from "../types/BookCardType.ts";


const API_URL = import.meta.env.VITE_API_URL as string;

function buildQuery(params?: Record<string, string | number | boolean | undefined>) {
    const q = new URLSearchParams();
    if (!params) return "";
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") q.append(k, String(v));
    });
    const s = q.toString();
    return s ? `?${s}` : "";
}

async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const res = await fetch(input, { headers: { "Content-Type": "application/json" }, ...init });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed with status ${res.status}`);
    }
    return res.json() as Promise<T>;
}

export async function getBooks(opts?: {
    search?: string;
    genre?: string;
    author?: string;
}): Promise<Book[]> {
    const query = buildQuery(opts);
    return apiFetch<Book[]>(`${API_URL}/books${query}`);
}

export async function getBookById(id: number): Promise<Book> {
    return apiFetch<Book>(`${API_URL}/books/${id}`);
}

export async function createBook(data: BookCardProps): Promise<Book> {
    return apiFetch<Book>(`${API_URL}/books`, {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function deleteBook(id: number): Promise<Book> {
    return apiFetch<Book>(`${API_URL}/books/${id}`, { method: "DELETE" });
}