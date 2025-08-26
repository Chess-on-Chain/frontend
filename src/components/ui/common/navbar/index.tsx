import { Link } from "react-router-dom";
import ConnectWalletBtn from "../button/BtnConnectWallet";

export default function Navbar() {
    return (
      <nav className="flex items-center justify-between px-0 sm:px-4 py-3 w-full">
        <div className="-ml-2">
          <Link to="/">
            <img src="/Logo-COC-Black-Version.png" alt="Logo Chess On Chain" className="h-10 sm:h-12 w-auto" />
          </Link>
        </div>

        <div className="flex justify-end items-center space-x-4 sm:space-x-8">
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 dark:bg-primary hover:bg-none group cursor-pointer"
          >
            <Link to="/friends" className="flex justify-center flex-col items-center">
              <img src="/icon-friends.svg" alt="Icon Friend" className="w-8 h-8 -ml-0.5" />
            </Link>
          </button>
          <ConnectWalletBtn />
        </div>
    </nav>
    )
}