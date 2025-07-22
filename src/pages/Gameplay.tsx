import React, { useRef } from "react";
import { Chess } from "chess.js";
import Board from "../components/ui/common/board/Board";
import { Flag } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";

interface MoveData {
  from_position: string;
  to_position: string;
  piece: string;
}

interface LayoutProps {
  chessGame: any;
  handleSelfMove: (move: MoveData) => Promise<void>;
}

const Gameplay = () => {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;

  const isMobile = useIsMobile();

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
    <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full mx-auto">
      {isMobile ? (
        <MobileLayout chessGame={chessGame} handleSelfMove={handleSelfMove} />
      ) : (
        <DesktopLayout chessGame={chessGame} handleSelfMove={handleSelfMove} />
      )}
    </div>
  );
};

const MobileLayout: React.FC<LayoutProps> = ({ chessGame, handleSelfMove }) => {
  return (
    <div className="lg:hidden w-full mx-auto py-10 flex flex-col items-center p-0 space-x-4 space-y-4 min-h-screen">
      {/* PLAYER 1 */}
      <div className="flex justify-between itmes-center space-x-2 w-full text-white text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-secondary"></div>
          <div>
            <p>@Username</p>
            <p className="text-white/50">IDN</p>
          </div>
        </div>
        <div className="overflow-x-auto hide-scrollbar whitespace-nowrap text-white flex flex-1 items-center gap-2 ml-1 px-2 text-sm">
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
        <div className="ml-2 px-3 py-1 text-xl border border-white">0:20</div>
      </div>

      <div className="aspect-square w-full max-w-[700px] bg-white">
        <Board
          boardOrientation="white"
          chess={chessGame}
          onSelfMove={handleSelfMove}
        />
      </div>

      {/* PLAYER 2 */}
      <div className="flex justify-between items-center space-x-2 w-full text-sm text-white">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-secondary"></div>
          <div>
            <p>@Username</p>
            <p className="text-white/50">IDN</p>
          </div>
        </div>
        <div className="overflow-x-auto hide-scrollbar whitespace-nowrap text-white flex flex-1 items-center gap-2 ml-1 px-2 text-sm">
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
        <div className="ml-2 px-3 py-1 text-xl border border-white">0:20</div>
      </div>

      {/* RESIGN BUTTON */}
      <div className="flex justify-center items-center w-full my-8">
        <div className="text-center">
          <div className="p-3.5 rounded-full mb-1 5 mx-auto bg-secondary">
            <Link to="/">
              <Flag size={24} className="text-black" />
            </Link>
          </div>
          <p className="text-white">Resign</p>
        </div>
      </div>

      {/* SCORE BOTTOM */}
      <div className="w-full border-t border-white/20 text-center text-sm text-white">
        {/* MOVES */}
        <div className="flex-1 flex justify-center h-[400px] w-full py-4">
          <div className="w-full lg:hidden h-full">
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
      </div>
    </div>
  );
};

const DesktopLayout: React.FC<LayoutProps> = ({
  chessGame,
  handleSelfMove,
}) => {
  return (
    <div className="hidden lg:flex items-center justify-center w-full h-full space-x-4">
      {/* LEFT - RESIGN */}
      <div className="flex-1 h-full flex justify-center">
        <div className="flex justify-center items-center w-full lg:w-3/5 h-full">
          <div className="mx-auto text-center">
            <div className="p-4.5 mx-auto rounded-full mb-1 5 bg-secondary">
              <Link to="/">
                <Flag size={24} className="text-black" />
              </Link>
            </div>
            <p className="text-lg tracking-wide text-white">Resign</p>
          </div>
        </div>
      </div>

      {/* MIDDLE - BOARD */}
      <div className="aspect-square w-full max-w-[700px] bg-white">
        <Board
          // key={isMobile ? "mobile" : "desktop"}
          boardOrientation="white"
          chess={chessGame}
          onSelfMove={handleSelfMove}
        />
      </div>

      {/* RIGHT - MOVES & SCORE */}
      <div className="flex-1 flex justify-center h-full py-4">
        <div className="w-full xl:w-3/5 h-full">
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
    </div>
  );
};

export default Gameplay;
