import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

import { BookCard } from "./BookCard";

describe("BookCard", () => { // agrupo tests que tienen que ver con BookCard
    it("view of title and author", () => { // titulo del test
        render(
            <BookCard
                title="El Principito"
                author="Antoine de Saint-Exupéry"
                genre="Fábula"
                synopsis="Un clásico sobre la amistad."
                yearPublished={1943}
            />
        );

        expect(
            // busco x article porque mi contendor bookcard es un article (osea la parte de author y title)
            screen.getByRole("article", { name: /el principito.*antoine/i })
        ).toBeInTheDocument();

        // con estos me fijo que aparezcan en la screen
        expect(screen.getByText("El Principito")).toBeInTheDocument();
        expect(screen.getByText(/Antoine de Saint/i)).toBeInTheDocument();
    });

    it("genre, synopsis, year", () => {
        render(
            <BookCard
                title="Chau"
                author="Cortázar"
                genre="Cuento"
                synopsis="Breve sinopsis."
                yearPublished={1965}
            />
        );

        expect(screen.getByText("Cuento")).toBeInTheDocument();
        expect(screen.getByText("Breve sinopsis.")).toBeInTheDocument();
        expect(screen.getByText(/Published in:\s*1965/i)).toBeInTheDocument();
    });

    it("if optional not present -> ok", () => {
        render(<BookCard title="1984" author="George Orwell" genre={""} synopsis={""} yearPublished={0} />);

        expect(screen.getByText("1984")).toBeInTheDocument();
        expect(screen.getByText(/George Orwell/)).toBeInTheDocument();

        expect(screen.queryByText(/Publicado:/i)).not.toBeInTheDocument();
    });
});