import { PrismaClient, Book } from '@prisma/client'

const prisma = new PrismaClient()

export class BookRepository {
    async findAllBooks(): Promise<Book[]> {
        return prisma.book.findMany()
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
