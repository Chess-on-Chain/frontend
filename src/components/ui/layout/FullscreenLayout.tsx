import { Home } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MatchContext } from "../../../context/MatchContext";
// import { Chess } from "chess.js";
import { useMatchTimer } from "../../../hooks/timer";
import {usePawnDawn} from "../../../hooks/pawnDawn";

// interface ColorDawn {
//   b: number;
//   k: number;
//   n: number;
//   q: number;
//   p: number;
//   r: number;
// }

const pawnEmoji: any = {
  b: ["♗", "♝"],
  k: ["♔", "♚"],
  n: ["♘", "♞"],
  p: ["♙", "♟"],
  q: ["♕", "♛"],
  r: ["♖", "♜"],
};

const FullscreenGameLayout = ({ children }: any) => {
  const { opponent, self, selfColor } = useContext(MatchContext);

  const [opponentColor, setOpponentColor] = useState<
    "white" | "black" | undefined
  >();

  useEffect(() => {
    setOpponentColor(selfColor == "white" ? "black" : "white");
  }, [selfColor]);

  const { timeColor, timeLeft } = useMatchTimer(60);
  const { selfPawnDawn, opponentPawnDawn } = usePawnDawn();

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
                <div className="lg:text-xl text-clip line-clamp-1">
                  {self?.username || self?.first_name || "Guest"}
                </div>
                <div className="text-white/50 text-xs lg:text-base">
                  {self?.country || "-"} - {self?.score || 0}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto hide-scrollbar whitespace-nowrap text-white flex flex-1 items-center gap-2 ml-4 px-2 text-sm">
              {selfPawnDawn &&
                Object.entries(selfPawnDawn).map(
                  ([piece, total]: [any, any]) => {
                    return (
                      <div
                        key={piece}
                        className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1"
                      >
                        <span className="text-xs">{total as number}</span>{" "}
                        {pawnEmoji[piece][selfColor == "white" ? 1 : 0]}
                      </div>
                    );
                  }
                )}
            </div>
          </div>

          {/* Tengah */}
          <div className="flex col-auto justify-center items-center space-x-10 text-white">
            <div className="time-player1 text-5xl italic text-white">
              {timeColor == selfColor ? timeLeft : "-:-"}
            </div>
            <div className="text-white flex flex-col items-center">
              <div className="text-2xl font-semibold">⏱</div>
              <div className="text-white/60 text-sm italic">Time Match</div>
            </div>
            <div className="time-player2 text-white/50 text-5xl italic">
              {timeColor == opponentColor ? timeLeft : "-:-"}
            </div>
          </div>

          {/* Kanan */}
          <div className="flex items-center justify-end gap-4">
            <div className="text-white flex flex-row-reverse gap-2 mr-4 px-2 text-sm overflow-x-scroll whitespace-nowrap hide-scrollbar">
              {opponentPawnDawn &&
                Object.entries(opponentPawnDawn).map(
                  ([piece, total]: [any, number]) => {
                    return (
                      <div
                        key={piece}
                        className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1"
                      >
                        <span className="text-xs">{total}</span>{" "}
                        {pawnEmoji[piece][selfColor == "white" ? 0 : 1]}
                      </div>
                    );
                  }
                )}
            </div>
            <div className="flex gap-4">
              <div className="max-w-[100px] text-white text-sm leading-tight text-right">
                <div className="lg:text-xl text-right text-clip line-clamp-1">
                  {opponent?.username || opponent?.first_name || "Guest"}
                </div>
                <div className="text-white/50 text-xs lg:text-base">
                  {self?.country || "-"} - {self?.score || 0}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-linear_gradient" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative flex-1 flex items-center justify-center">
        <div className="w-full h-[768px] flex justify-center items-center">
          {children}
        </div>
      </main>

      <footer className="hidden lg:flex justify-center w-full h-32 px-10 ">
        <div className="flex justify-between items-center w-full h-full">
          {/* <div className="flex justify-between items-center w-full max-w-screen-2xl h-full"> */}
          <Link to="/">
            <img
              src="/Logo-COC-Black-Version.png"
              alt="Logo COC"
              className="h-14"
            />
          </Link>
          <button className="text-center cursor-pointer">
            <div className="mx-auto text-center">
              <div className="p-3.5 mx-auto rounded-full mb-1 bg-secondary">
                <Link to="/">
                  <Home size={24} className="text-black" />
                </Link>
              </div>
              <p className="text-lg tracking-wide text-white">Home</p>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default FullscreenGameLayout;
