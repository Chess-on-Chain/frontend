import { Chess, type Square } from "chess.js";
import { useContext, useState } from "react";
import {
  Chessboard,
  defaultPieces,
  type SquareHandlerArgs,
} from "react-chessboard";
import { BoardContext } from "../../../../context/BoardContext";

export default function Board({
  onSelfMove,
}: {
  onSelfMove: ({
    from_position,
    to_position,
    piece,
  }: {
    from_position: string;
    to_position: string;
    piece: string;
  }) => Promise<void>;
}) {
  const [chessPosition, setChessPosition] = useContext(BoardContext);
  const [moveFrom, setMoveFrom] = useState("");
  const [optionSquares, setOptionSquares] = useState({});

  // useEffect(() => {
  //   console.log({ chessPosition }, "s");
  // }, [chessPosition]);

  const [, , boardOrientation] = useContext(BoardContext);

  const chessGame = new Chess(chessPosition);

  const [currentPiece, setCurrentPiece] = useState("");

  // get the move options for a square to show valid moves
  function getMoveOptions(square: Square) {
    // get the moves for the square
    const moves = chessGame.moves({
      square,
      verbose: true,
    });

    // if no moves, clear the option squares
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    // create a new object to store the option squares
    const newSquares: Record<string, React.CSSProperties> = {};

    // loop through the moves and set the option squares
    for (const move of moves) {
      newSquares[move.to] = {
        background:
          chessGame.get(move.to) &&
          chessGame.get(move.to)?.color !== chessGame.get(square)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)" // larger circle for capturing
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        // smaller circle for moving
        borderRadius: "50%",
      };
    }

    // set the square clicked to move from to yellow
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };

    // set the option squares
    setOptionSquares(newSquares);

    // return true to indicate that there are move options
    return true;
  }

  async function onSquareClick({ square, piece }: SquareHandlerArgs) {
    // piece clicked to move
    if (!moveFrom && piece) {
      if (
        (boardOrientation == "white" && piece?.pieceType.startsWith("b")) ||
        (boardOrientation == "black" && piece?.pieceType.startsWith("w"))
      ) {
        return;
      }

      // get the move options for the square
      const hasMoveOptions = getMoveOptions(square as Square);

      // if move options, set the moveFrom to the square
      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      setCurrentPiece(piece.pieceType);
      // return early
      return;
    }

    // square clicked to move to, check if valid move
    const moves = chessGame.moves({
      square: moveFrom as Square,
      verbose: true,
    });
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    // not a valid move
    if (!foundMove) {
      // check if clicked on new piece
      const hasMoveOptions = getMoveOptions(square as Square);

      // if new piece, setMoveFrom, otherwise clear moveFrom
      setMoveFrom(hasMoveOptions ? square : "");

      // return early
      return;
    }

    // is normal move
    // console.log({moveFrom, square}, 's')
    try {
      chessGame.move({
        from: moveFrom,
        to: square,
        promotion: "q",
      });
    } catch {
      // if invalid, setMoveFrom and getMoveOptions
      const hasMoveOptions = getMoveOptions(square as Square);

      // if new piece, setMoveFrom, otherwise clear moveFrom
      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      // return early
      return;
    }

    setChessPosition(chessGame.fen());
    setMoveFrom("");
    setOptionSquares({});

    await onSelfMove({
      from_position: moveFrom,
      to_position: square,
      piece: currentPiece.slice(1),
    });
  }

  const pieces = {
    ...defaultPieces,
    // wK: () => {
    //   return <s
    // }
  };

  const chessboardOptions = {
    allowDragging: false,
    onSquareClick,
    position: chessPosition,
    squareStyles: optionSquares,
    id: "click-to-move",
    boardOrientation,
    showAnimations: true,
    pieces,
  };

  return (
    <Chessboard options={chessboardOptions} />
    // </BoardContext.Provider>
  );
}
