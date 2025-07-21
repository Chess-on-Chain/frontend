import { Link } from "react-router-dom";

export default function ToProfileBtn() {
  return (
    <button className="text-xs text-white/70 hover:text-white flex items-center gap-1 cursor-pointer">
      <Link to="/profile">See Profile</Link>
      <span>→</span>
    </button>
  );
}
