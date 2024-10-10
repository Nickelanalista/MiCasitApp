import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { generateChatResponse } from '../utils/openai';

interface ChatbotWindowProps {
  isDarkMode: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ isDarkMode, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "¡Hola! Soy Francisco Ackermann, experto inmobiliario en Chile. ¿En qué puedo ayudarte hoy?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const userMessage = { text: input, sender: 'user' as const };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
      setIsLoading(true);

      const chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await generateChatResponse([...chatHistory, { role: 'user', content: input }]);
      
      setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot' }]);
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-20 right-4 w-80 h-[32rem] rounded-lg shadow-xl overflow-hidden flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-white'} z-50`}>
      <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white flex justify-between items-center`}>
        <h3 className="font-bold">Chat con Francisco Ackermann</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.sender === 'bot' && (
              <img src="https://yt3.googleusercontent.com/tmHkjDFMg7QRXciYBCk_UROWiY8j8myTDD7N2Og22mlIltqnrdIQhm6RoJGrPiw0lFAyEGhFCRs=s900-c-k-c0x00ffffff-no-rj" alt="Francisco Ackermann" className="w-8 h-8 rounded-full mr-2" />
            )}
            <div className={`max-w-3/4 p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800')}`}>
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-center">
            <img src="https://yt3.googleusercontent.com/tmHkjDFMg7QRXciYBCk_UROWiY8j8myTDD7N2Og22mlIltqnrdIQhm6RoJGrPiw0lFAyEGhFCRs=s900-c-k-c0x00ffffff-no-rj" alt="Francisco Ackermann" className="w-8 h-8 rounded-full mr-2" />
            <div className={`max-w-3/4 p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className={`flex-1 p-2 rounded-l-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-r-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotWindow;