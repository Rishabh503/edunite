import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FileUp, ImageIcon, LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SolutionUpload = () => {
  const [selectedType, setSelectedType] = useState('pdf'); // 'pdf' or 'image'
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file && selectedType === 'image') {
      setPreviewURL(URL.createObjectURL(file));
    } else {
      setPreviewURL(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    // formData.append(selectedType === 'pdf' ? 'pdf' : 'image', selectedFile);
formData.append('file', selectedFile);


    setIsLoading(true);
    try {
      const endpoint =
        selectedType === 'pdf'
          ? 'https://eduassist-nak8.onrender.com/extract-text-pdf'
          : 'https://edunitex.onrender.com/predict';

      const res = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const fullText = res.data.text || res.data.recognized_text;
      setRecognizedText(fullText);

      // Log extracted text to console only for handwritten images
    if (selectedType === 'image') {
      console.log("Extracted Handwritten Data:", fullText);
    }

      // Optional: Navigate to another page
      navigate('/evaluate-answer', { state: { extractedText: fullText } });
    } catch (err) {
      console.error('Upload Error:', err);
      alert(`❌ Failed to process the ${selectedType.toUpperCase()} file.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-blue-300 text-gray-900 pt-20 pb-24 px-6 flex flex-col items-center justify-center"
    >
      <div className="bg-white/70 backdrop-blur-md border border-blue-200 shadow-2xl p-8 rounded-2xl text-center max-w-md w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center justify-center gap-2 text-blue-600">
          {selectedType === 'pdf' ? <FileUp /> : <ImageIcon />} Upload {selectedType === 'pdf' ? 'Answer PDF' : 'Handwritten Image'}
        </h1>
        <p className="text-gray-700 mb-6 text-sm">
          AI will read and evaluate student answers from the uploaded {selectedType === 'pdf' ? 'PDF' : 'image'}.
        </p>

        <div className="mb-4 flex justify-center gap-6 text-sm">
          <label>
            <input
              type="radio"
              name="uploadType"
              value="pdf"
              checked={selectedType === 'pdf'}
              onChange={() => {
                setSelectedType('pdf');
                setSelectedFile(null);
                setPreviewURL(null);
                setRecognizedText('');
              }}
            />{' '}
            PDF
          </label>
          <label>
            <input
              type="radio"
              name="uploadType"
              value="image"
              checked={selectedType === 'image'}
              onChange={() => {
                setSelectedType('image');
                setSelectedFile(null);
                setPreviewURL(null);
                setRecognizedText('');
              }}
            />{' '}
            Handwritten Image
          </label>
        </div>

        <input
          type="file"
          accept={selectedType === 'pdf' ? 'application/pdf' : 'image/*'}
          onChange={handleFileChange}
          className="mb-4 text-sm file:bg-blue-500 file:hover:bg-blue-600 file:text-white file:rounded-lg file:px-4 file:py-2 file:border-none"
        />

        {previewURL && (
          <img
            src={previewURL}
            alt="Preview"
            className="mb-4 rounded-md shadow-md max-h-64 object-contain mx-auto"
          />
        )}

        <button
          onClick={handleUpload}
          className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg flex items-center justify-center gap-2 text-white w-full disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : 'Evaluate Answers'}
        </button>

        {recognizedText && (
          <div className="mt-6 bg-white p-4 rounded shadow text-left">
            <h3 className="font-semibold text-lg text-blue-600 mb-2">Extracted Text:</h3>
            <pre className="text-sm whitespace-pre-wrap">{recognizedText}</pre>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SolutionUpload;
