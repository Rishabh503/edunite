import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Moon, Sun, ChevronRight, Upload, BookText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const ChooseSubject = () => {
  const [subject, setSubject] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');

  const navigate = useNavigate();
  const subjects = ['Math', 'Physics', 'Biology', 'English', 'Chemistry', 'Other'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const generateQuestions = async () => {
    const chosenSubject = subject === 'Other' ? customSubject : subject;
    if (!chosenSubject || !difficulty) return;

    setLoading(true);
    try {
      const prompt = `
You are an oral test examiner.
Generate 5 short and clear oral test questions for a ${difficulty} level ${chosenSubject} subject.
- Keep questions concise, speakable, and relevant.
- Avoid technical jargon or lengthy paragraphs.
- Make them suitable for a spoken test, not written exams.
Only list the questions. No explanations.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const questions = text
        .split('\n')
        .map(q => q.replace(/^[-•\d.]*\s*/, '').trim())
        .filter(Boolean)
        .slice(0, 5);

      setQuestionList(questions);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPdf = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('https://eduassist-nak8.onrender.com/extract-pdf', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.questions?.length > 0) {
        setQuestionList(data.questions);
      } else {
        alert('No questions extracted. Try another file.');
      }
    } catch (err) {
      console.error('Error uploading PDF:', err);
      alert('Something went wrong while uploading the PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    if (questionList.length === 0) return;
    navigate('/oral-test', {
      state: {
        questions: questionList,
        subject: subject === 'Other' ? customSubject : subject,
        difficulty
      }
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 text-black min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col items-center">
        <div className="flex justify-between items-center w-full mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-blue-700">
            <BookText /> Oral Test Practice
          </h1>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg shadow transition"
            >
              🏠 Home
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-xl hover:scale-110 transition-transform"
            >
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-600" />}
            </button>
          </div>
        </div>

        {/* Tab Switch */}
        <div className="flex gap-4 mb-8">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'generate' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
            onClick={() => setActiveTab('generate')}
          >
            Generate with AI
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
            onClick={() => setActiveTab('upload')}
          >
            Upload PDF
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'generate' ? (
            <motion.div
              key="generate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full"
            >
              {/* Subject Selection */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {subjects.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(s)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border border-blue-400 ${subject === s ? 'bg-blue-600 text-white' : 'bg-white text-blue-700'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {subject === 'Other' && (
                <input
                  type="text"
                  placeholder="Enter custom subject"
                  className="w-full p-2 rounded-lg border border-blue-300 mb-4"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                />
              )}

              {/* Difficulty Level */}
              <div className="flex gap-4 mb-6">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setDifficulty(lvl)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border border-teal-400 ${difficulty === lvl ? 'bg-teal-500 text-white' : 'bg-white text-teal-700'}`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <button
                onClick={generateQuestions}
                disabled={!subject || !difficulty || loading}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg mb-6 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? 'Generating...' : <><Sparkles size={18} /> Generate Questions</>}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full text-center"
            >
              <label className="cursor-pointer inline-block text-sm font-medium bg-blue-600 text-white px-5 py-2 rounded-lg mb-6">
                <Upload className="inline mr-2" size={18} />
                Upload PDF
                <input type="file" accept="application/pdf" className="hidden" onChange={handleUploadPdf} />
              </label>
            </motion.div>
          )}
        </AnimatePresence>

        {questionList.length > 0 && (
          <div className="w-full bg-white/70 backdrop-blur p-4 rounded-lg mb-6 border border-blue-300 max-w-2xl">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Generated Questions:</h3>
            <ul className="list-disc pl-5 space-y-2 text-blue-900 text-sm">
              {questionList.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleProceed}
          disabled={questionList.length === 0}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          <ChevronRight size={18} /> Start Oral Test
        </button>
      </div>
    </div>
  );
};

export default ChooseSubject;
