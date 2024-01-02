import { PDFDocument } from "pdf-lib";
import axios from "axios";
import fs from "fs";

import PokemonInfo from "../models/pokemonInfo";

const inputPdfPath = "./media/pdf-input.pdf";

async function createPdf(pokemon: PokemonInfo) {
  // Load the existing PDF
  const existingPdfBytes = fs.readFileSync(inputPdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Add a blank page to the document
  const page = pdfDoc.getPages()[0];

  // Fetch image using axios
  const imageUrl = pokemon.imageUrl;
  const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const imageBytes = new Uint8Array(imageResponse.data);

  // Embed the image into the PDF
  const image = await pdfDoc.embedPng(imageBytes);
  const imageSize = image.scale(1);
  const x = 275;
  const y = page.getHeight() - imageSize.height - 475;
  const width = 325;
  const height = 325;
  const borderWidth = 3;

  // Draw the image on top of the black border
  page.drawImage(image, {
    x: x + borderWidth, 
    y: y + borderWidth, 
    width: width,
    height: height
  });

  // Draw text fields
  page.drawText(`Id: ${pokemon.id}`, { x: 50, y: page.getHeight() - 150, size: 18 });
  page.drawText(`Name: ${pokemon.name}`, { x: 50, y: page.getHeight() - 200, size: 18 });
  page.drawText(`Type: ${pokemon.type}`, { x: 50, y: page.getHeight() - 250, size: 18 });
  page.drawText(`Abilities: ${pokemon.abilities}`, { x: 50, y: page.getHeight() - 300, size: 18 });
  page.drawText(`Species: ${pokemon.species}`, { x: 50, y: page.getHeight() - 350, size: 18 });
  page.drawText(`Height: ${pokemon.height}`, { x: 50, y: page.getHeight() - 400, size: 18 });
  page.drawText(`Weight: ${pokemon.weight}`, { x: 50, y: page.getHeight() - 450, size: 18 });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}

export default createPdf;