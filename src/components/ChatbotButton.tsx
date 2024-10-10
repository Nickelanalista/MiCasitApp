import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatbotWindow from './ChatbotWindow';

interface ChatbotButtonProps {
  isDarkMode: boolean;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setHasNotification(false);
  };

  return (
    <>
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg ${
          isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-all duration-300 ease-in-out transform hover:scale-110 z-50`}
      >
        <MessageCircle size={24} />
        {hasNotification && (
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white"></span>
        )}
      </button>
      {isOpen && <ChatbotWindow isDarkMode={isDarkMode} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatbotButton;