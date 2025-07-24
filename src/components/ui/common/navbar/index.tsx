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
          {/* Connect to Wallet */}
          <ConnectWalletBtn />
        </div>
    </nav>
    )
}