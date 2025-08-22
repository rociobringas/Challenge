import { Request, Response, NextFunction } from "express";
import { LibraryService } from "../service/libraryService";


const libraryService = new LibraryService();

export class LibraryController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const books = await libraryService.getAllLibrary();
            res.status(200).json(books);
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = Number(req.params.id);
            const book = await libraryService.getLibraryBookById(bookId);
            res.status(200).json(book);
        } catch (err) {
            next(err);
        }
    }

    async add(req: Request, res: Response, next: NextFunction) {
        try {
            const { bookId } = req.body; // { "bookId": 123 }
            const book = await libraryService.newBookToLibrary(Number(bookId));
            res.status(201).json(book);
        } catch (err) {
            next(err);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = Number(req.params.id);
            const deleted = await libraryService.deleteFromLibrary(bookId);
            res.status(200).json(deleted);
        } catch (err) {
            next(err);
        }
    }
}