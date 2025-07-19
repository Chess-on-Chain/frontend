import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import ConnectWalletBtn from "../button/BtnConnectWallet";

export default function Navbar() {
    return (
        <nav className="relative flex justify-between">
          <div className="left">
            <div className="w-full xs:w-[20%] sm:w-[30%] md:w-[40%]">
                <Link to='/' >
                    <img
                      src="/Logo-COC-Black-Version.png"
                      alt="Logo Chess on Chain"
                      className="w-full h-auto" />
                </Link>
            </div>
          </div>

          <div className="right flex justify-end align-baseline w-full sm:w-[70%] md:w-[60%] h-full self-center gap-3 md:gap-8 lg:gap-10">
            <button className="cursor-pointer">
              <Bell size={32} color="currentColor" strokeWidth={1} className="mt-px sm:text-2xl text-secondary"/>
            </button>
            <ConnectWalletBtn />
          </div>
        </nav>
    )
}