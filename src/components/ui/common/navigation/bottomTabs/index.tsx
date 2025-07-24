import { Link } from "react-router-dom";

export default function BottomTabs() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-primary border-t border-gray-200 dark:bg-primary dark:backdrop-blur-lg dark:border-gray-600/20">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto pb-1.5 items-center font-medium text-white">
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 dark:bg-primary hover:bg-none group cursor-pointer"
        >
          <Link to="/" className="flex justify-center flex-col items-center">
            <img src="/icon-home.svg" alt="Icon Home" className="w-8 h-8" />
            <span className="text-xs text-secondary dark:text-secondary group-hover:text-accent dark:group-hover:text-secondary">
              Home
            </span>
          </Link>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 dark:bg-primary hover:bg-none group cursor-pointer"
        >
          <Link to="/gameplay" className="flex justify-center flex-col items-center">
            <img src="/icon-chessboard.svg" alt="Icon Chessboard" className="w-8 h-8" />
            <span className="text-xs text-secondary dark:text-secondary group-hover:text-accent dark:group-hover:text-secondary">
              Gameplay
            </span>
          </Link>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 dark:bg-primary hover:bg-none group cursor-pointer"
        >
          <Link to="/profile" className="flex justify-center flex-col items-center">
            <img src="/icon-profile.svg" alt="Icon Profile" className="w-8 h-8" />
            <span className="text-xs text-secondary dark:text-secondary group-hover:text-accent dark:group-hover:text-secondary">
              Profile
            </span>
          </Link>
        </button>
      </div>
    </div>
  );
}
