import { PrismaClient, Book } from '@prisma/client'
import type { BookFilters } from '../service/bookService'

const prisma = new PrismaClient()

export class BookRepository {
    async findAllBooks(filters: BookFilters = {}): Promise<Book[]> {
        const { search, genre, author } = filters;

        const where: any = {};

        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { author: { contains: search, mode: "insensitive" } },
            ];
        }
        if (genre) {
            where.genre = { equals: genre, mode: "insensitive" };
        }
        if (author) {
            where.author = { contains: author, mode: "insensitive" };
        }

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

    async createBook(data: Omit<Book, 'id'>): Promise<Book> {
        return prisma.book.create({
            data,
        })
    }

    async deleteBook(id: number): Promise<Book> {
        return prisma.book.delete({
            where: { id },
        })
    }
}
