import type { Book } from "../types/BookType.ts";
import type {BookCardProps} from "../types/BookCardType.ts";


const API_URL = import.meta.env.VITE_API_URL as string;


function buildQuery(opts?: { search?: string; genre?: string; author?: string }) {
    if (!opts) return "";
    const p = new URLSearchParams();
    if (opts.search) p.set("search", opts.search);
    if (opts.genre)  p.set("genre", opts.genre);
    if (opts.author) p.set("author", opts.author);
    const qs = p.toString();
    return qs ? `?${qs}` : "";
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