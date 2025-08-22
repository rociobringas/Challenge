import {BookRepository} from "../repository/bookRepository";
import {Book} from "@prisma/client";
import {BadRequestError, NotFoundError} from "../../Errors";


export class BookService {
    constructor(private bookRepo = new BookRepository()) {}

    async getAllBooks(): Promise<Book[]> {
       return this.bookRepo.findAllBooks()
    }

    async getBookById(bookId: number): Promise<Book> {
        this.idValidator(bookId);
        const book = await this.bookRepo.findBookById(bookId)
        if (!book) {
            throw new NotFoundError("Book not found")
        }
        return book
    }

    async create(data: Omit<Book, 'id'>) {
        return this.bookRepo.createBook(data)
    }


    async delete(bookId: number): Promise<Book> {
        this.idValidator(bookId);
        const deleted = await this.bookRepo.deleteBook(bookId);
        if (!deleted) throw new NotFoundError("Book not found");
        return deleted;
    }

    private idValidator(id: number): void {
        if (!Number.isInteger(id) || id <= 0) {
            throw new BadRequestError("Invalid ID");
        }
    }
}