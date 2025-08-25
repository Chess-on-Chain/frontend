import React, { useState } from "react";
import Modal from "../Modal";

interface SharePopupProps {
  type: "link" | "email";
  link?: string;
  onClose: () => void;
}

const SharePopup: React.FC<SharePopupProps> = ({ type, link, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");

  const handleCopy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvite = () => {
    console.log("Inviting emails:", email);
    setEmail("");
    onClose();
  };

  return (
    <>
        {/* Content */}
        {type === "link" && (
        <Modal open={true} onClose={onClose}>
            <div className="flex flex-col items-center mb-4">
            <div className="text-4xl mb-2">
                <img src="/bonding.png" alt="" className="w-20 h-20" />
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
        </Modal>
        )}

        {type === "email" && (
        <Modal open={true} onClose={onClose}>
            <div className="flex flex-col items-center mb-4">
                <div className="mb-2 text-4xl">
                    <img src="/mail.png" alt="" className="w-20 h-20" />
                </div>
                <h2 className="text-xl font-semibold">Email Invite</h2>
            </div>
            <p className="mb-4 text-sm text-center text-gray-300">Invite a Friend to join you can on Chess On Chain</p>
            <textarea 
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-20 mb-2 p-2 text-sm rounded-md outline-none bg-[#1E1E1E]"
            >
            </textarea>
            <p className="text-xs mb-4 text-gray-400">
                Separate multiple address with comma or space.
            </p>
            <button
                onClick={handleInvite}
                className="w-full bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-md font-medium text-2xl cursor-pointer"
            >
                Invite
            </button>
        </Modal>
        )}
    </>
  );
};

export default SharePopup;