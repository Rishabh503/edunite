import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Moon, Sun, ChevronRight, Upload, BookText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export default function ChooseTopic() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const [topicText, setTopicText] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('english'); // ✅ New
  const navigate = useNavigate();

  const handleGenerateStory = async (text) => {
    setLoading(true);
    try {
      const prompt = `
Explain the following topic in a simple, engaging, and story-like format for beginners:

"${text}"

- Use friendly storytelling with examples.
- Avoid technical jargon.
- Make it feel like a human is explaining naturally.
- Translate and narrate in ${language} language.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const output = response.text();
      setStory(output);
    } catch (err) {
      console.error(err);
      alert('Failed to generate story.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = () => {
    if (!topicText.trim()) return;
    handleGenerateStory(topicText.trim());
  };

  const handleUploadPdf = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('https://eduassist-nak8.onrender.com/extract-text-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const extractedText = data?.text || '';

      setTopicText(extractedText);
      if (extractedText) {
        await handleGenerateStory(extractedText);
      } else {
        alert('No content extracted from PDF.');
      }
    } catch (err) {
      console.error(err);
      alert('Error while uploading PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    if (!story) return;
    navigate('/story', {
      state: { topic: topicText, story, language }, // ✅ Pass language
    });
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-50'} min-h-screen transition-all duration-300`}>
      <div className="max-w-4xl mt-16 mx-auto px-4 py-10">
        <motion.div className="flex justify-between items-center mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Topic Story Generator
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-blue-700" />}
          </button>
        </motion.div>

        {/* Language Selector */}
        <div className="mb-6">
          <label className="font-medium mr-3">Select Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-1 rounded border bg-white text-black"
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="hinglish">Hinglish</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 py-2 font-medium ${activeTab === 'text'
              ? `${darkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600'}`
              : `${darkMode ? 'text-gray-400' : 'text-gray-500'}`}`}
          >
            <BookText className="inline mr-2 w-4 h-4" />
            Enter Topic
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 font-medium ${activeTab === 'upload'
              ? `${darkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600'}`
              : `${darkMode ? 'text-gray-400' : 'text-gray-500'}`}`}
          >
            <Upload className="inline mr-2 w-4 h-4" />
            Upload PDF
          </button>
        </div>

        {/* Input Areas */}
        <AnimatePresence mode="wait">
          {activeTab === 'text' ? (
            <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <textarea
                className={`w-full p-4 rounded-lg border min-h-[120px] resize-none ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                placeholder="Enter your topic or explanation here..."
                value={topicText}
                onChange={(e) => setTopicText(e.target.value)}
              />
              <button
                onClick={handleTextSubmit}
                disabled={!topicText || loading}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Story'}
              </button>
            </motion.div>
          ) : (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <label className="block text-sm mb-2 font-medium">Upload a PDF containing a topic explanation</label>
              <div className={`p-6 border-2 border-dashed rounded-lg text-center ${darkMode ? 'bg-gray-700 border-gray-500' : 'bg-blue-100 border-blue-300'}`}>
                <Upload className="w-10 h-10 mx-auto mb-2 text-blue-500" />
                <p>Drag and drop or select a PDF</p>
                <label className="mt-4 inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Browse
                  <input type="file" accept=".pdf" onChange={handleUploadPdf} className="hidden" />
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Output */}
        {story && (
          <motion.div
            className={`mt-8 p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">Generated Story:</h2>
            <p className="whitespace-pre-wrap">{story}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleProceed}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
              >
                Proceed to 3D Model
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
