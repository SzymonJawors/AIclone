import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

if (!apiKey) {
  console.error("Brak klucza API! Upewnij się, że masz plik .env z REACT_APP_GOOGLE_API_KEY");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function sendMsgToGenAi(message) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Błąd Gemini:", err);
    return "Błąd podczas komunikacji z AI ";
  }
}
