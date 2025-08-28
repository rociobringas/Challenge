import { PrismaClient, Book, Prisma } from '@prisma/client'
import type { BookFilters } from '../service/bookService'

const prisma = new PrismaClient()

export class BookRepository {
    async findAllBooks(filters: BookFilters = {}): Promise<Book[]> {
        const { search, genre, author } = filters;

        const where: any = {};

        if (search) {
            where.OR = [
                { title:  { startsWith: search, mode: "insensitive" } },
                { author: { startsWith: search, mode: "insensitive" } },
                { genre:  { startsWith: search, mode: "insensitive" } },
            ];
        }

        if (genre) where.genre =  { startsWith: genre, mode: "insensitive" };
        if (author) where.author = { startsWith: author, mode: "insensitive" };

        return prisma.book.findMany({
            where,
            orderBy: { id: "desc" },
        });
    }

    async findBookById(id: number): Promise<Book | null> {
        return prisma.book.findUnique({
            where: { id : id},
        })
    }


    async createBook(data: Omit<Book, "id">): Promise<Book> {
        try {
            return await prisma.book.create({ data });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
                const err: any = new Error("Book already exists (same title & author)");
                err.status = 409;
                throw err;
            }
            throw e;
        }
    }

    async deleteBook(id: number): Promise<Book> {
        return prisma.book.delete({
            where: { id },
        })
    }
}
