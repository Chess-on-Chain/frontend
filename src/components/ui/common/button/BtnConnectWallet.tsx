import { Link } from "react-router-dom";

export default function ConnectWalletBtn() {
  return (
    <button className="connect-btn">
        <Link to="/" className="font-semibold text-sm sm:text-base md:text-lg leading-none sm:leading-0">Connect to Wallet</Link>
    </button>
  );
}