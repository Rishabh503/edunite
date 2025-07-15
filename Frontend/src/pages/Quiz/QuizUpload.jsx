// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FileUp, LoaderCircle, UploadCloud } from 'lucide-react';
// import { motion } from 'framer-motion';

// const QuizUpload = () => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [manualText, setManualText] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       let content = manualText;

//       if (pdfFile) {
//         const formData = new FormData();
//         formData.append('pdf', pdfFile);
//         const res = await axios.post('http://localhost:5000/extract-text-pdf', formData);
//         content = res.data.text;
//       }

//       navigate('/quiz', { state: { content } });
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to process input");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }} 
//       animate={{ opacity: 1, y: 0 }} 
//       className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-900 p-8 flex flex-col items-center justify-center"
//     >
//       <h1 className="text-4xl font-bold mb-6 text-blue-700 flex items-center gap-2">
//         <FileUp size={32} /> <span className="text-blue-400">Quiz Generator</span>
//       </h1>

//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={(e) => setPdfFile(e.target.files[0])}
//         className="mb-4 file:bg-blue-200 file:hover:bg-blue-300 file:text-blue-800 file:rounded-full text-sm"
//       />

//       <textarea
//         rows="10"
//         placeholder="📋 Or paste content here..."
//         value={manualText}
//         onChange={(e) => setManualText(e.target.value)}
//         className="w-full max-w-2xl bg-white/70 text-gray-900 placeholder-gray-500 border border-blue-200 p-4 mb-4 rounded-xl focus:outline-blue-400"
//       />

//       <button
//         onClick={handleSubmit}
//         className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl"
//         disabled={loading}
//       >
//         {loading ? <LoaderCircle className="animate-spin" /> : <UploadCloud />}
//         {loading ? 'Generating Quiz...' : 'Generate Quiz'}
//       </button>
//     </motion.div>
//   );
// };

// export default QuizUpload;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FileUp, LoaderCircle, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

const QuizUpload = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [manualText, setManualText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let content = '';

      if (pdfFile) {
        const formData = new FormData();
        formData.append('pdf', pdfFile);
        const res = await axios.post('https://eduassist-nak8.onrender.com/extract-text-pdf', formData);
        content = res.data.text?.trim();
      } else if (manualText.trim()) {
        content = manualText.trim();
      }

      if (!content) {
        alert("❌ Please upload a PDF or enter some text.");
        setLoading(false);
        return;
      }

localStorage.setItem("eduassist_quiz_content", content);
      navigate('/quiz', { state: { content } });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to process input");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-900 p-8 flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        <FileUp size={32} /> <span className="text-blue-400">Quiz Generator</span>
      </h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdfFile(e.target.files[0])}
        className="mb-4 file:bg-blue-200 file:hover:bg-blue-300 file:text-blue-800 file:rounded-full text-sm"
      />

      <textarea
        rows="10"
        placeholder="📋 Or paste content here..."
        value={manualText}
        onChange={(e) => setManualText(e.target.value)}
        className="w-full max-w-2xl bg-white/70 text-gray-900 placeholder-gray-500 border border-blue-200 p-4 mb-4 rounded-xl focus:outline-blue-400"
      />

      <button
        onClick={handleSubmit}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl"
        disabled={loading}
      >
        {loading ? <LoaderCircle className="animate-spin" /> : <UploadCloud />}
        {loading ? 'Generating Quiz...' : 'Generate Quiz'}
      </button>
    </motion.div>
  );
};

export default QuizUpload;
