export default function BottomTabs() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-transparent dark:border-gray-600/20">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <img src="/icon-home.svg" alt="Icon Home" className="w-8 h-8" />
          <span className="text-xs text-gray-500 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Home
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <img src="/icon-chessboard.svg" alt="Icon Chessboard" className="w-8 h-8" />
          <span className="text-xs text-gray-500 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Gameplay
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <img src="/icon-chat.svg" alt="Icon Chat" className="w-8 h-8" />
          <span className="text-xs text-gray-500 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            message
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <img src="/icon-profile.svg" alt="Icon Profile" className="w-8 h-8" />
          <span className="text-xs text-gray-500 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Profile
          </span>
        </button>
      </div>
    </div>
  );
}
