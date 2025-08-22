import { Router } from "express";
import {LibraryController} from "../controller/libraryController";

const router = Router();
const controller = new LibraryController();

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.add.bind(controller));
router.delete("/:id", controller.remove.bind(controller));

export default router;