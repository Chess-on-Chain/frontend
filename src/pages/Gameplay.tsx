import { useRef } from "react";
import Board from "../components/ui/common/board/Board";
import { Chess } from "chess.js";

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
    <>
      <h1 className="text-2xl font-semibold">Gameplay</h1>
      <div className="max-w-xl">
        <Board
          boardOrientation="white"
          chess={chessGame}
          onSelfMove={handleSelfMove}
        />
      </div>
    </>
  );
};

export default Gameplay;
