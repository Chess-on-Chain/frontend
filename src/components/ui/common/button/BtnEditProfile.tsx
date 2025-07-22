import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

export default function EditProfile() {
  return (
    <button className="text-xs px-3 py-2 rounded-sm text-white/70 hover:text-white flex items-center gap-1 border border-secondary hover:bg-secondary cursor-pointer">
      <Link to="/profile/edit" className="text-base mr-1.5">Edit Profile</Link>
      <span>
        <Edit className="h-full"/>
      </span>
    </button>
  );
}
