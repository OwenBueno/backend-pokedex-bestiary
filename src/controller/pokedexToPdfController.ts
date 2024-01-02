import { Request, Response } from "express";
import fs from "fs";

import getPokemonInfo from "../utils/getPokemon";
import createPdf from "../utils/createPdf";

const normalizeSearchTerm = (search: string): string => search.replace(/\s/g, "-");

export const getPdf = async (req: Request, res: Response) => {
    try {
        let { pokemon } = req.query;
        pokemon = normalizeSearchTerm(pokemon as string);
        const pokemonInfo = await getPokemonInfo(pokemon, "pokedexToPdf");

        // Check if pokemonInfo is not null before proceeding
        if (pokemonInfo !== null) {
            const pdfBytes = await createPdf(pokemonInfo);
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=${pokemon}.pdf`);
            res.setHeader("Content-Length", pdfBytes.length);
          
            // Send the binary data
            res.write(pdfBytes, "binary");
            res.end(null, "binary");

        } else {
            // Handle the case where pokemonInfo is null (not found)
            res.status(404).send("Pokemon not found");
        }
    } catch (error) {
        // Handle other errors
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

