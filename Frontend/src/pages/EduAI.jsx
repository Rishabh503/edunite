import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const EduAI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('eduai-chat');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('eduai-chat', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const formatContext = () =>
    messages.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      content: msg.text,
    }));

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://eduassist-nak8.onrender.com/chat', {
        message: input,
        context: [...formatContext(), { role: 'user', content: input }],
      });

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: response.data.response },
      ]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '❌ Sorry, I could not process your request.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setInput('');
    localStorage.removeItem('eduai-chat');
  };

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') return;

    const formData = new FormData();
    formData.append('pdf', file);

    setIsLoading(true);

    try {
      const res = await axios.post('https://eduassist-nak8.onrender.com/extract-text-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const extractedText = res.data.text?.trim();
      if (!extractedText) throw new Error('No text extracted.');

      const userMessage = { sender: 'user', text: extractedText };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      const response = await axios.post('https://eduassist-nak8.onrender.com/chat', {
        message: extractedText,
        context: [...formatContext(), { role: 'user', content: extractedText }],
      });

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: response.data.response },
      ]);
    } catch (error) {
      console.error('PDF Error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '❌ Failed to process the PDF.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadMessagePDF = (text, index) => {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save(`response-${index + 1}.pdf`);
  };

  const downloadFullChat = () => {
    const doc = new jsPDF();
    let y = 10;
    messages.forEach((msg, index) => {
      const sender = msg.sender === 'user' ? 'You' : 'EduAI';
      const lines = doc.splitTextToSize(`${sender}: ${msg.text}`, 180);
      if (y + lines.length * 10 > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(lines, 10, y);
      y += lines.length * 10;
    });
    doc.save('eduai-full-chat.pdf');
  };

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-b from-blue-100 to-white px-3 py-6">
      <div className="max-w-3xl mx-auto rounded-2xl bg-white/70 backdrop-blur-md shadow-2xl p-6 sm:p-8 border border-blue-200">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-6">
          Edu<span className="text-blue-400">AI</span>
        </h2>

        <div
          ref={chatBoxRef}
          className="bg-white/60 backdrop-blur-lg border border-blue-200 rounded-xl p-4 h-[60vh] overflow-y-auto space-y-3 scroll-smooth text-gray-800"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`relative px-4 py-2 rounded-xl max-w-[85%] animate-fade-in ${
                msg.sender === 'user'
                  ? 'ml-auto bg-gradient-to-br from-blue-400 to-blue-600 text-white'
                  : 'mr-auto bg-blue-100 text-blue-900'
              }`}
            >
              {msg.text}

              {msg.sender === 'bot' && (
                <button
                  onClick={() => downloadMessagePDF(msg.text, idx)}
                  className="absolute top-1 right-1 text-xs bg-white/60 hover:bg-white text-blue-700 rounded px-2 py-0.5"
                  title="Download response as PDF"
                >
                  ⬇️
                </button>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="mr-auto px-4 py-2 bg-blue-100 text-blue-800 rounded-xl max-w-[85%] animate-pulse">
              Typing...
            </div>
          )}
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg bg-white border border-blue-200 placeholder-gray-500 text-gray-900 focus:outline-blue-400"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Send
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePDFUpload}
              className="text-sm text-blue-700 file:px-3 file:py-1 file:rounded-full file:bg-blue-200 hover:file:bg-blue-300 file:text-blue-800"
            />
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded-lg"
              >
                Clear Chat
              </button>
              <button
                onClick={downloadFullChat}
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1.5 rounded-lg"
              >
                Download Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind animation class */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default EduAI;
