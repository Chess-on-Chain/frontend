import { ChevronRight } from "lucide-react";

// type CardProps = {
//     text: String;
// };

// export default function CardShare({ text }: CardProps) {
export default function CardShare() {
    return (
        <div className="flex flex-col gap-4 lg:gap-6 w-full md:max-w-xs">
            <div className="w-full h-20 bg-primary/60 rounded-lg border border-neutral-800 p-4 flex justify-between">
                <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center lg:self-end justify-center">
                        <img src="/Friend-Link.png" className="w-8 h-8" alt="" />

                        {/* <span className="text-black text-2xl">🎲</span> */}
                    </div>
                    <div className="text-left text-white text-shadow-secondary bg-primary italic font-medium px-2 py-1 text-lg lg:text-xl">
                        {/* <Link to="/gameplay"> */}
                        {/* {text} */}
                        {/* </Link> */}
                        Friend Link
                    </div>
                </div>
                <div className="w-8 h-full flex items-center justify-center">
                    <ChevronRight className="text-lg"/>
                    {/* <span className="text-lg lg:text-2xl">▶</span> */}
                </div>
            </div>
            <div className="w-full h-20 bg-primary/60 rounded-lg border border-neutral-800 p-4 flex justify-between">
                <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center lg:self-end justify-center">
                        <img src="/Email-Link.png" className="w-8 h-8" alt="" />

                        {/* <span className="text-black text-2xl">🎲</span> */}
                    </div>
                    <div className="text-left text-white text-shadow-secondary bg-primary italic font-medium px-2 py-1 text-lg lg:text-xl">
                        {/* <Link to="/gameplay"> */}
                        {/* {text} */}
                        {/* </Link> */}
                        Send Email Invite
                    </div>
                </div>
                <div className="w-8 h-full flex items-center justify-center">
                    <ChevronRight className="text-lg"/>
                    {/* <span className="text-lg lg:text-2xl">▶</span> */}
                </div>
            </div>
        </div>
    )
}
