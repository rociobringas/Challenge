import { Router } from "express";
import { BookController } from "../controller/bookController";

const router = Router();
const controller = new BookController();

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;