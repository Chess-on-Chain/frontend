import { ChevronRight } from "lucide-react";
import { useState } from "react";
import SharePopup from "../../modals/SharePopup";


type CardShareProps = {
    type: "link" | "email";
    title: string;
    icon: string;
    link?: string;
}

export default function CardShare({ type, title, icon, link }: CardShareProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="w-full h-20 flex justify-between p-4 rounded-lg border border-neutral-800 bg-primary/60 cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full lg:selft-end bg-secondary">
                        <img src={icon} className="w-8 h-8" alt="" />
                    </div>
                    <div className="text-left text-white text-shadow-secondary bg-primary italic font-medium px-2 py-1 text-lg lg:text-xl">
                        {title}
                    </div>
                </div>
                <button
                    className="w-8 h-full flex items-center justify-center"
                >
                    <ChevronRight className="text-lg" />
                </button>
            </div>

            {open && (
                <SharePopup
                    type={type}
                    link={link}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    )
}
