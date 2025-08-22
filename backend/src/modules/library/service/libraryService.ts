// src/modules/library/service/libraryService.ts
import { Book } from "@prisma/client";
import { BadRequestError, NotFoundError } from "../../Errors";
import { LibraryRepository } from "../repository/libraryRepository";

export class LibraryService {
    constructor(private libraryRepo = new LibraryRepository()) {}

    async getAllLibrary(): Promise<Book[]> {
        const books = this.libraryRepo.findAllLibraryBooks();
        if (!books) throw new BadRequestError("There are no books in the Library")
        return books
    }

    async getLibraryBookById(bookId: number): Promise<Book> {
        this.idValidator(bookId);
        const book = await this.libraryRepo.findLibraryBookById(bookId);
        if (!book) throw new NotFoundError("Book not found in library");
        return book;
    }

    async newBookToLibrary(bookId: number): Promise<Book> {
        this.idValidator(bookId);
        return this.libraryRepo.addBookToLibrary(bookId);
    }

    async deleteFromLibrary(bookId: number): Promise<Book> {
        this.idValidator(bookId);
        const deleted = await this.libraryRepo.deleteLibraryBook(bookId);
        if (!deleted) throw new NotFoundError("Book not found in library");
        return deleted;
    }

    private idValidator(id: number): void {
        if (!Number.isInteger(id) || id <= 0) {
            throw new BadRequestError("Invalid ID");
        }
    }
}