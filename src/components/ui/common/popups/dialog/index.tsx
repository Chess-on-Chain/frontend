const ConfirmDialog: React.FC<{
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}> = ({ open, onClose, onConfirm, message }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
            <div className="w-80 p-6 space-y-4 rounded-xl shadow-xl bg-[#1E1E1E]">
                <p className="text-lg text-center text-white">{message}</p>
                <div className="flex justify-between mt-6">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 rounded text-text border border-secondary/20 hover:bg-secondary cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={()=> {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700 cursor-pointer"
                    >
                        Resign
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog;