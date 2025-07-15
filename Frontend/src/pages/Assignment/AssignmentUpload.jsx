import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AssignmentUpload = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!pdfFile) return;

    const formData = new FormData();
    formData.append('pdf', pdfFile);

    setIsLoading(true);
    try {
      const res = await axios.post('https://eduassist-nak8.onrender.com/extract-text-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const fullText = res.data.text;
      navigate('/solve-assignment', { state: { extractedText: fullText } });
    } catch (err) {
      console.error('PDF Parse Error:', err);
      alert('❌ Failed to extract text from PDF.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white text-gray-900 flex items-center justify-center px-6 pt-24 pb-20">
      <div className="bg-white/70 backdrop-blur-md border border-blue-200 p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-700 animate-pulse">
          📘 Upload Your Assignment
        </h1>
        <p className="text-center text-sm text-blue-500 mb-6">
          Upload your assignment PDF to receive AI-generated solutions.
        </p>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
          className="block w-full text-sm mb-5 text-gray-800 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0 file:text-sm file:font-semibold
          file:bg-blue-200 file:hover:bg-blue-300 file:text-blue-800"
        />

        <button
          onClick={handleUpload}
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 transition duration-200 text-white py-2 px-4 rounded-lg font-semibold disabled:opacity-60"
        >
          {isLoading ? '⏳ Extracting...' : '🚀 Solve Assignment'}
        </button>
      </div>
    </div>
  );
};

export default AssignmentUpload;
