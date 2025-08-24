import { X } from "lucide-react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
    >
      <div className="bg-gray-800 text-white rounded-xl p-6 w-[400px] relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white cursor-pointer"
          aria-label="Close modal"
        >
          <X size={32} />
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
