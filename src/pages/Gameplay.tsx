import { useRef } from "react";
import { Chess } from "chess.js";
import Board from "../components/ui/common/board/Board";
import { Flag } from "lucide-react";
import { Link } from "react-router-dom";

const Gameplay = () => {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;

  const handleSelfMove = async ({
    from_position,
    to_position,
    piece,
  }: {
    from_position: string;
    to_position: string;
    piece: string;
  }) => {
    console.log({ from_position, to_position, piece });
    new Audio("/audio/move.mp3").play();
  };

  return (
    <div className="flex items-center justify-center w-full lg:max-w-full h-[768px]">
      <div className="left flex-1 h-full hidden lg:flex lg:justify-center">
        <div className="flex justify-center items-center w-full lg:w-3/5 h-full">
          <div className="mx-auto text-center">
            <div className="p-3.5 mx-auto rounded-full mb-1.5 bg-secondary">
              <Link to="/">
                <Flag size={24} className=" text-black"/>
              </Link>
            </div>
            <p className="text-lg tracking-wide">Resign</p>
          </div>
        </div>
      </div>
      {/* <div className="left w-full h-full bg-accent"></div> */}
      <div className="aspect-square w-full max-w-[700px] bg-white">
        <Board
          boardOrientation="white"
          chess={chessGame}
          onSelfMove={handleSelfMove}
        />
      </div>
      <div className="right flex-1 h-full py-4 hidden lg:flex lg:justify-center">
        <div className="w-full lg:w-3/5 h-full">
          <div className="flex items-center justify-center p-4 h-full">
            <div className="border border-white/40 rounded w-full h-full flex flex-col">
              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto hide-scrollbar">
                {Array.from({ length: 30 }, (_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[auto_1fr_1fr] divide-x-3 divide-dashed divide-white/20 items-center text-white text-sm border-b border-white/20 py-2 px-4"
                  >
                    <span className="min-w-10 text-left text-white/40">
                      {i + 1}
                    </span>
                    <span className="text-center">♟ C6</span>
                    <span className="text-center">♟ C6</span>
                  </div>
                ))}
              </div>

              {/* Fixed bottom */}
              <div className="h-16 border-t border-white/20 px-4 flex items-center text-white text-sm text-wrap lg:text-base space-x-4">
                <p className="font-medium">Score : </p>
                <span className="align-baseline">0 | 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="right w-full h-full bg-amber-700"></div> */}
    </div>
  );
};

export default Gameplay;
