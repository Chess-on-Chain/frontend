import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

export default function EditProfile() {
  return (
    <button className="text-xs px-3 py-2 rounded-sm text-white/70 hover:text-black hover:font-semibold flex items-center gap-1 border border-secondary hover:bg-secondary cursor-pointer">
      <Link to="/profile/edit" className="text-base lg:text-lg flex gap-2">
        Edit Profile
        <span>
          <Edit className="h-full"/>
        </span>
      </Link>
    </button>
  );
}
