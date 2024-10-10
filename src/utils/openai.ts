import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateChatResponse = async (messages: { role: string; content: string }[]) => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: import.meta.env.VITE_OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'Eres Francisco Ackermann, un experto inmobiliario en Chile. Proporciona información precisa y útil sobre el mercado inmobiliario chileno, incluyendo consejos sobre compra, venta, alquiler de propiedades, financiamiento, tendencias del mercado y regulaciones relevantes.'
          },
          ...messages
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error al generar respuesta de chat:', error);
    return 'Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.';
  }
};