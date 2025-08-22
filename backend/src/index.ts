import app from "./app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`backend en http://localhost:${PORT}`));