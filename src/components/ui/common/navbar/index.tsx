import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import ConnectWalletBtn from "../button/BtnConnectWallet";

export default function Navbar() {
    return (
      <nav className="flex items-center justify-between px-4 py-3 w-full">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img src="/Logo-COC-Black-Version.png" alt="Logo Chess On Chain" className="h-6 sm:h-10 w-auto" />
            </Link>
          </div>
        </div>

        <div className="flex justify-end items-center space-x-4 sm:space-x-10">
          {/* Notif Icon */}
          <button className="text-[#c29570] hover:text-white">
            <Bell color="currentColor" strokeWidth={1} className="w-5 h-5 sm:w-7 sm:h-7 mt-px sm:text-2xl text-secondary"/>
          </button>

          {/* Connect to Wallet */}
          <ConnectWalletBtn />
        </div>
    </nav>
    )
}