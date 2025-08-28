import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import jsPDF from 'jspdf';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const AssignmentSolver = () => {
  const location = useLocation();
  const extractedText = location?.state?.extractedText || '';
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const prompt = `Analyze the following assignment and provide comprehensive, step-by-step solutions:

"""
${extractedText}
"""

Instructions:
1. Clearly identify each question
2. Solve each step-by-step
3. Use professional academic formatting
4. Include necessary explanations
5. Maintain a helpful and professional tone`;

  useEffect(() => {
    const generateSolution = async () => {
      if (!extractedText) return;
      setIsLoading(true);
      try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent([prompt]);
        const text = await result.response.text();
        setSolution(text);
      } catch (err) {
        console.error('Gemini Error:', err);
        setSolution('❌ Failed to generate solution.');
      } finally {
        setIsLoading(false);
      }
    };

    generateSolution();
  }, [extractedText]);

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(solution, 180);
    let y = 10;

    lines.forEach((line) => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(line, 10, y);
      y += 7;
    });

    doc.save('assignment-solution.pdf');
  };

  if (!extractedText) {
    return (
      <div className="min-h-screenbg-gradient-to-br from-slate-800  to-slate-900 text-gray-800 flex items-center justify-center px-4 pt-24 pb-20">
        <p className="text-lg font-medium text-red-500">
          ⚠️ No assignment data found. Please upload a PDF again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800  to-slate-900 px-4 pt-24 pb-20 flex flex-col">
      <h1 className="text-4xl font-extrabold text-center mb-4 text-blue-700 animate-pulse">
        AI-Generated Assignment Solution
      </h1>
      <p className="text-center text-blue-500 mb-6 max-w-2xl mx-auto">
        Each question is solved with clarity, explanation, and academic formatting.
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center text-lg mt-10 text-blue-600 animate-pulse">
          Solving your assignment...
        </div>
      ) : (
        <>
          <div className="bg-white/70 backdrop-blur-md border border-blue-200 p-6 rounded-xl shadow-lg text-sm whitespace-pre-wrap max-h-[70vh] overflow-y-auto font-mono text-gray-800 mb-6">
            {solution}
          </div>

          <div className="flex justify-center">
            <button
              onClick={downloadAsPDF}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
            >
              📥 Download as PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AssignmentSolver;
