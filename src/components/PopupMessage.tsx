import { usePopup } from '../contexts/PopupContext';

const PopupMessage: React.FC = () => {
  const { message } = usePopup();

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-[#503e28] text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out">
      {message}
    </div>
  );
};

export default PopupMessage;
