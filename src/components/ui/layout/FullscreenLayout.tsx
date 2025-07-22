import { Home } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const FullscreenGameLayout = () => {
  return (
    // <div className="w-screen h-screen overflow-hidden flex items-center justify-center text-wite">
    <div className="w-screen h-screen flex flex-col text-white">
      <header className="hidden lg:flex items-center">
        <div className="w-full bg-[#0e0e0e] py-4 px-6 grid grid-cols-3 items-center justify-between rounded">
          {/* Kiri */}
          <div className="flex items-center justify-end gap-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-linear_gradient" />
              <div className="max-w-[100px] text-white text-sm leading-tight">
                <div className="lg:text-xl text-clip line-clamp-1">@Username jdjdjdjdjdjdjdjddkdkdkdkdkdkddjdjdjdjdjdjdjdjdjdjdjdjdjd</div>
                <div className="text-white/50 text-xs lg:text-base">IDN - 300</div>
              </div>
            </div>
            <div className="overflow-x-auto hide-scrollbar whitespace-nowrap text-white flex flex-1 items-center gap-2 ml-4 px-2 text-sm">
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="text-xs">+2</span> ♞
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="text-xs">+2</span> ♖
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♙
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="text-xs">+2</span> ♞
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="text-xs">+2</span> ♖
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♙
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="text-xs">+2</span> ♞
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="text-xs">+2</span> ♖
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♙
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="text-xs">+2</span> ♞
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="text-xs">+2</span> ♖
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♙
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="text-xs">+2</span> ♞
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="text-xs">+2</span> ♖
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♙
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="text-xs">+2</span> ♞
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="text-xs">+2</span> ♖
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♙
              </div>
            </div>
          </div>

          {/* Tengah */}
          <div className="flex col-auto justify-center items-center space-x-10 text-white">
            <div className="time-player1 text-5xl italic text-gray-500">0:20</div>
            <div className="text-white flex flex-col items-center">
              <div className="text-2xl font-semibold">⏱</div>
              <div className="text-white/60 text-sm italic">Time Match</div>
            </div>
            <div className="time-player2 text-5xl italic">0:10</div>
          </div>

          {/* Kanan */}
          <div className="flex items-center justify-end gap-4">
            <div className="text-white flex flex-row-reverse gap-2 mr-4 px-2 text-sm overflow-x-scroll whitespace-nowrap hide-scrollbar">
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♕
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♞ <span className="text-xs">+2</span>
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♙ <span className="text-xs">+4</span>
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♕
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♞ <span className="text-xs">+2</span>
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♙ <span className="text-xs">+4</span>
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♕
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♞ <span className="text-xs">+2</span>
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♙ <span className="text-xs">+4</span>
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♕
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♞ <span className="text-xs">+2</span>
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♙ <span className="text-xs">+4</span>
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♕
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♞ <span className="text-xs">+2</span>
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♙ <span className="text-xs">+4</span>
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♕
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♞ <span className="text-xs">+2</span>
              </div>
              <div className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                ♙ <span className="text-xs">+4</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="max-w-[100px] text-white text-sm leading-tight text-right">
                <div className="lg:text-xl text-right text-clip line-clamp-1">@Username jdjdjdjdjdjdjdjddkdkdkdkdkdkddjdjdjdjdjdjdjdjdjdjdjdjdjd</div>
                <div className="text-white/50 text-xs lg:text-base">200 - IDN</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-linear_gradient" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative flex-1 flex items-center justify-center">
        <div className="w-full h-[768px] flex justify-center items-center">
          <Outlet />
        </div>
      </main>

      <footer className="hidden lg:flex justify-center w-full h-32 px-10 ">
        <div className="flex justify-between items-center w-full h-full">
        {/* <div className="flex justify-between items-center w-full max-w-screen-2xl h-full"> */}
          <Link to="/">
            <img src="/Logo-COC-Black-Version.png" alt="Logo COC" className="h-14" />
          </Link>
          <button className="text-center cursor-pointer">
            <div className="relative w-[46px] h-[46px] mx-auto rounded-full mb-1.5 bg-secondary">
              <Link to="/">
                <Home className="absolute top-[18%] left-[50%] -translate-x-[50%] w-[28px] h-[28px] text-black"/>
              </Link>
            </div>
            <p className="text-lg tracking-wide">Back to Home</p>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default FullscreenGameLayout;
