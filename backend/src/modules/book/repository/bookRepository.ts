import pool from "../../../db/connections"; // conexion a Postgres
import { Book } from "../entity/book";       // entity

export class BookRepository {
    async findAllBooks(): Promise<Book[]> {
        // pongo async porque el resultado es una promise, osea una respuesta futura que puede ser pending, fullfiled, rejected
        const result = await pool.query("SELECT * FROM book");
        return result.rows; // devuelve un array de libros
    }

    async findBookById(id: number): Promise<Book | null> {
        const result = await pool.query("SELECT * FROM book WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return null; // si no encuentra el libro, devuelve null
        }
        return result.rows[0]; // devuelve el primer libro encontrado
    }


    async createBook(title: string, author: string, genre: string, synopsis: string, publishedYear: number): Promise<Book> {
        // promise que si se resuelve va a ser un objeto book
        const result = await pool.query(
            `INSERT INTO book (title, author, genre, synopsis, publishedYear) 
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
            [title, author, genre, synopsis, publishedYear]
        );
        // columnas en la que meto valores,
        // VALUES = los valores que meto
        // RETURNING * = el libro que acabo de crear, el asterisco serian todas las col
        return result.rows[0];
    }

    async deleteBook(id: number): Promise<void> {
        const result = await pool.query("DELETE FROM book WHERE id = $1", [id]);
    }
}
