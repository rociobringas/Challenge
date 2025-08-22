// add book
// delete book


import pool from "../../../db/connections"; // conexion a Postgres
import { Book } from "../../book/entity/book";       // entity
import { Library } from "../entity/library";       // entity

export class LibraryRepository{

    async findLibraryBooks(): Promise<Book[]> {
        // pongo async porque el resultado es una promise, osea una respuesta futura que puede ser pending, fullfiled, rejected
        const result = await pool.query("SELECT * FROM  library");
        return result.rows; // devuelve un array de libros
    }

    async findLibraryBookById(id: number): Promise<Book | null> {
        const result = await pool.query("SELECT * FROM library WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return null; // si no encuentra el libro, devuelve null
        }
        return result.rows[0]; // devuelve el primer libro encontrado
    }

    async deleteBookFromLibrary(id: number): Promise<void> {
        const result = await pool.query("DELETE FROM library WHERE id = $1", [id]);
    }

    async addBookToLibrary(title: string, author: string, genre: string, synopsis: string, publishedYear: number): Promise<Book> {
        const result = await pool.query(
            `INSERT INTO library (title, author, genre, synopsis, publishedYear) 
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [title, author, genre, synopsis, publishedYear]
        );
        return result.rows[0];
    }

}
