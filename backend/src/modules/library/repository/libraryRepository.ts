import { PrismaClient, Library, Book } from '@prisma/client'
import {BookRepository} from "../../book/repository/bookRepository";
import {BadRequestError} from "../../../errors";

const prisma = new PrismaClient()
const bookRepo = new BookRepository()

class NotFoundError extends Error { status = 404 }

export class LibraryRepository {
    async findAllLibraryBooks(): Promise<Book[]> {
        const libraryEntries = await prisma.library.findMany({
            include: { book: true } // con esto no solo traigo el id del book, sino el Object Book
            // en vez de darme una lista de id, me da una lista de book
        });
        if (!libraryEntries) throw new NotFoundError("There are no books in the library")
        return libraryEntries.map(entry => entry.book);
        // con esto saco el book, de book : Book, y me deja solo una lista de Book
    }

    async findLibraryBookById(id: number): Promise<Book> {
        const book = await prisma.library.findUnique({
            where: { id : id },
            include: { book: true }
        })
        if (!book) throw new NotFoundError("Book not in library");
        return book.book;
    }

    async addBookToLibrary(bookId: number): Promise<Book> {
        const exists = await prisma.book.findUnique({ where: { id: bookId } });
        if (!exists) throw new NotFoundError("Book not found");

        const created = await prisma.library.create({
            data: { bookId },
            include: { book: true },
        });
        if (!created) throw new BadRequestError("Book could not be added to library");
        return created.book;
    }

    async deleteLibraryBook(bookId: number): Promise<Book> {
        if (await bookRepo.findBookById(bookId) == null) throw new NotFoundError("Book not found")
        const book = await prisma.library.delete({
            where: { bookId : bookId },
            include: { book: true },
        })
        if (!book) throw new NotFoundError("book could not be deleted")
        return book.book
    }
}