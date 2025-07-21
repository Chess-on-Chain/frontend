import { useRef } from "react";
import { Chess } from "chess.js";
import Board from "../components/ui/common/board/Board";
import FullscreenGameLayout from "../components/ui/layout/FullscreenLayout"

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
    <FullscreenGameLayout>
        <div className="aspect-square w-full max-w-[400px] bg-white">
            <div className="max-w-xl">
              <Board
                boardOrientation="white"
                chess={chessGame}
                onSelfMove={handleSelfMove}
              />
            </div>
        </div>
    </FullscreenGameLayout>
  );
};

export default Gameplay;
