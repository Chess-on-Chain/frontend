import { Link } from "react-router-dom";

export default function ConnectWalletBtn() {
  return (
    <button className="connect-btn">
        <Link to="/" className="font-semibold text-xl tracking-tight">Connect to Wallet</Link>
    </button>
  );
}