import { X } from "lucide-react";
import { useState } from "react";

interface FriendLinkPopupProps {
  link: string;
  onClose: () => void;
}

const FriendLinkPopup: React.FC<FriendLinkPopupProps> = ({ link, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        console.error("Failed to copy:", err);
    }
  }
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
      <div className="bg-primary text-white px-7 py-6 rounded-lg w-[400px] relative shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white cursor-pointer"
          onClick={onClose}
        >
          <X size={32}/>
        </button>

        {/* Icon + Title */}
        <div className="flex flex-col items-center mb-4">
          <div className="text-4xl mb-2">
            <img src="/bonding.png" alt="" className="w-20 h-20"/>
          </div>
          <h2 className="text-xl font-semibold">Friend Link</h2>
        </div>

        {/* Description */}
        <p className="text-center text-sm text-gray-400 mb-4">
          Send this link to anyone, and they will become your friend when they
          sign up.
        </p>

        {/* Link Box */}
        <div className="flex items-center bg-[#1E1E1E] rounded-md px-3 py-2 mt-6 mb-8">
          <input
            type="text"
            value={link}
            readOnly
            className="bg-transparent text-sm flex-1 outline-none"
          />
          <button
            onClick={handleCopy}
            className="ml-2 px-2 py-1 bg-secondary hover:bg-gray-500 rounded-md text-sm cursor-pointer text-primary font-bold"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default FriendLinkPopup;
