import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

export default function EditProfile() {
  return (
    <button className="text-xs px-2 py-1 sm:px-3 sm:py-2 rounded-sm text-white/70 hover:text-black hover:font-semibold flex items-center gap-1 border border-secondary hover:bg-secondary cursor-pointer">
      <Link to="/profile/edit" className="text-sm lg:text-lg flex gap-1 sm:gap-2">
        Edit Profile
        <span className="">
          <Edit size={24} className="inline-block w-4 h-4" />
        </span>
      </Link>
    </button>
  );
}
