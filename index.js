const express = require("express");
const sharp = require("sharp");

const app = express();
app.use(express.json({ limit: "10mb" })); // aceptar JSON grande

// Endpoint que recibe PNG en base64 y devuelve JPG en base64
app.post("/convert", async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    // Decodificar base64 a buffer
    const pngBuffer = Buffer.from(imageBase64, "base64");

    // Convertir a JPG con sharp
    const jpgBuffer = await sharp(pngBuffer)
      .jpeg()
      .toBuffer();

    // Codificar JPG a base64
    const jpgBase64 = jpgBuffer.toString("base64");

    res.json({ imageBase64: jpgBase64 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en la conversión" });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
