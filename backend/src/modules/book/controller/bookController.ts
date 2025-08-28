import { Request, Response, NextFunction } from "express";
import { BookService } from "../service/bookService";

const bookService = new BookService();

export class BookController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { search, genre, author } = req.query;
            const books = await bookService.getAllBooks({
                search: search as string | undefined,
                genre: genre as string | undefined,
                author: author as string | undefined,
            });
            res.status(200).json(books);
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const book = await bookService.getBookById(id);
            res.status(200).json(book);
        } catch (err) {
            next(err);
        }
    }


    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const book = await bookService.create(req.body); // tu DTO validado en service
            res.status(201).json(book);
        } catch (err) {
            next(err);
        }
    }


    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const deleted = await bookService.delete(id);
            res.status(200).json(deleted);
        } catch (err) {
            next(err);
        }
    }
}

