import { Camera, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileSettings = () => {
  return (
    <div className="min-h-screen w-full lg:max-w-7xl px-6 py-10 text-white">
      <div className="mb-10 text-2xl font-semibold">Profile Settings</div>

      {/* TOP Section */}
      <div className="flex items-center gap-6 mb-10">
        <div className="relative w-24 h-24 rounded-full bg-linear-to-b from-secondary to-[#4F3B2B]">
          <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-accent flex items-center justify-center shadow-md">
            <Camera size={16} className="text-black" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl font-semibold">
            @Username{" "}
            <span className="w-2 h-2 translate-y-0.5 bg-white/50 rounded-full" />
            <span className=" mt-1.5 text-sm sm:text-base lg:text-lg text-gray-400">
              {" "}
              IDN
            </span>
          </div>
          <div className="lg:text-xl text-gray-400">
            Score: <span className="text-white">100</span>
          </div>
          <div className="flex items-center gap-3 mt-3 w-fit text-sm lg:text-base">
            <span className="text-white font-semibold">Rank: </span>
            <span className="px-2 py-0 5 font-bold w-fit text-sm lg:text-xl bg-accent text-black rounded-sm">
              500
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6 border-t border-white/20" />

      {/* Detail Form */}
      <div className="mt-14">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Details</h2>
        <form action="" className="space-y-4 w-full lg:max-w-2xl">
          <div className="flex items-center space-x-11">
            <label htmlFor="username" className="block text-lg sm:text-xl text-gray-400 mb-xl">
              Username
            </label>
            <div className="flex-1 flex items-center space-x-4">
              <input
                type="text"
                name="usrname"
                id="username"
                className="w-full px-3 py-2 text-lg tracking-wide border border-white/20 text-white bg-black rounded disabled:bg-primary disabled:border-white/5"
                defaultValue="Firman"
                disabled
              />
              <button
                type="button"
                className="px-4 py-2 rounded-sm bg-secondary text-black font-semibold hover:bg-secondary cursor-not-allowed"
              >
                Change
              </button>
            </div>
          </div>

          {/* Biodata Profil */}
          <div className="flex items-center space-x-9">
            <label
              htmlFor="firstName"
              className="block mb-1 text-lg sm:text-xl text-gray-400"
            >
              First Name
            </label>
            <div className="flex-1 flex items-center">
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="w-full px-3 py-2 text-lg tracking-wide text-white bg-black border border-white/20 rounded"
              />
            </div>
          </div>

          <div className="flex items-center space-x-9">
            <label htmlFor="lastName" className="block mb-1 text-lg sm:text-xl text-gray-400">
              Last Name
            </label>
            <div className="flex-1 flex items-center">
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="w-full px-3 py-2 text-lg tracking-wide text-white bg-black border border-white/20 rounded"
              />
            </div>
          </div>

          <div className="flex items-center space-x-14 text-white">
            <label htmlFor="country" className="block mb-1 text-lg sm:text-xl text-gray-400">
              Country
            </label>
            <div className="relative flex-1 flex items-center">
              <select
                name="country"
                id="country"
                className="w-full px-3 py-2 text-lg tracking-wide border border-white/20 bg-black text-white appearance-none"
                defaultValue="Indonesia"
              >
                <option value="Indonesia">INDONESIA</option>
                <option value="China">CHINA</option>
                <option value="Rusia">RUSIA</option>
                <option value="USA">USA</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 text-white pointer-events-none"
                size={18}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-6 mt-10 py-2 items-center justify-center lg:justify-start">
            <button
              type="submit"
              className="px-6 py-2 text-base lg:text-xl font-semibold text-white bg-transparen border border-white/20 hover:bg-secondary rounded cursor-pointer"
            >
              <Link to="/profile">
                Cancel
              </Link>
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-base lg:text-xl font-semibold text-black bg-secondary hover:bg-secondary rounded cursor-pointer"
            >
              Save All
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
