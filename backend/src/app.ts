import express from "express";
import cors from "cors";
import bookRoutes from "./modules/book/routes/bookRoutes";
import libraryRoutes from "./modules/library/routes/libraryRoutes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/library", libraryRoutes);

export default app;