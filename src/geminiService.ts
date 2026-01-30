
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateKindMessage = async (giftName: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Escreva uma mensagem curta e carinhosa (em português) para um cartão de presente de uma lista de chá de casa nova. O presente é: ${giftName}. A mensagem deve ser elegante e acolhedora, com no máximo 20 palavras.`,
            config: {
                temperature: 0.8,
                topP: 0.95,
            }
        });
        return response.text || "Desejando muita felicidade e amor no novo lar!";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Que este presente traga muita alegria para o seu novo lar!";
    }
};
