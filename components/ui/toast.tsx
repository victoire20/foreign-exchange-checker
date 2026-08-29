import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface ToastProps {
  message: string;
  duration?: number;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = ({ message, duration = 3000 }: ToastProps) => {
    setToast({ message, duration });
    setTimeout(() => setToast(null), duration);
  };

  return { toast, showToast };
};

export const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 bg-[#202022] border border-[#CEF739] rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300 z-50">
      <FaCheckCircle className="text-[#CEF739] text-lg" />
      <span className="text-[#FFF] text-sm leading-[120%] tracking-[0.5px]">{message}</span>
    </div>
  );
};
