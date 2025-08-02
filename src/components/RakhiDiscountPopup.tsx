import React from 'react';

type Props = {
  onClose: () => void;
};

const RakhiDiscountPopup: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg relative">
        <h2 className="text-xl font-bold mb-2">🎉 Rakhi Special!</h2>
        <p className="mb-4 text-gray-700">Enjoy <strong>10% OFF</strong> on all products. Limited time offer!</p>
        <button
          onClick={onClose}
          className="bg-[#503e28] text-white px-4 py-2 rounded-lg hover:bg-[#3d2f1f] transition"
        >
            {/* group bg-[#503e28] text-white px-8 py-4 font-light tracking-wide hover:bg-[#3d2f1f] transition-all duration-300 flex items-center space-x-3 */}
          Start Shopping
        </button>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default RakhiDiscountPopup;
