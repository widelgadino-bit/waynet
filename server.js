import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});
let conversaciones = [];

app.post("/chat", async (req, res) => {
  try {
    const { mensaje, contexto } = req.body;

    // Guardar mensaje usuario
    conversaciones.push({ role: "user", content: mensaje });

    const respuesta = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Eres el asistente virtual de WAyNET.

${contexto || ""}

Reglas:
- Respondé siempre como asistente de WAyNET
- Sé claro, profesional y breve
- Si preguntan por servicios, explicá y ofrecé ayuda
- No inventes servicios que no existan
          `
        },
        ...conversaciones
      ]
    });

    const bot = respuesta.choices[0].message.content;

    // Guardar respuesta bot
    conversaciones.push({ role: "assistant", content: bot });

    res.json({ respuesta: bot });

  } catch (error) {
    console.error(error);
    res.status(500).json({ respuesta: "Error del servidor" });
  }
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});