import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import ConnectWalletBtn from "../button/BtnConnectWallet";

export default function Navbar() {
    return (
        <nav className="relative flex justify-between">
          <div className="left">
            <div className="w-full sm:w-[30%] md:w-[40%]">
                <Link to='/' >
                    <img
                      src="/Logo-COC.png"
                      alt="Logo Chess on Chain"
                      className="w-full h-auto" />
                </Link>
            </div>
          </div>

          <div className="right flex justify-between align-baseline h-full self-center gap-6">
            <button className="cursor-pointer">
              <Bell size={40} color="currentColor" strokeWidth={1} className="mt-px text-secondary"/>
            </button>
            <ConnectWalletBtn />
          </div>
        </nav>
    )
}