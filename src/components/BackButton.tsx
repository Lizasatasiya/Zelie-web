import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-sm text-[#503e28] hover:underline mb-4"
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      Back
    </button>
  );
};

export default BackButton;
