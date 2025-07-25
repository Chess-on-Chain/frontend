import { useContext, useEffect, useState } from "react";
import { MatchContext } from "../context/MatchContext";
import { BoardContext } from "../context/BoardContext";
import { Chess } from "chess.js";

// const pawnEmoji: any = {
//   b: ["♗", "♝"],
//   k: ["♔", "♚"],
//   n: ["♘", "♞"],
//   p: ["♙", "♟"],
//   q: ["♕", "♛"],
//   r: ["♖", "♜"],
// };

const pieces = ["b", "k", "n", "q", "p", "r"];
const colors = ["w", "b"];

interface ColorDawn {
  b: number;
  k: number;
  n: number;
  q: number;
  p: number;
  r: number;
}

export default () => {
  const { selfColor } = useContext(MatchContext);
  const [chessPosition] = useContext(BoardContext);

  const [resultSelfPawnDawn, setResultSelfPawnDawn] = useState<
    ColorDawn | undefined
  >();
  const [resultOpponentPawnDawn, setResultOpponentPawnDawn] = useState<
    ColorDawn | undefined
  >();

  //   useEffect(() => {
  //     console.log(chessPosition, "SSSSS");
  //   }, [chessPosition]);

  const [selfPawnDawn, setSelfPawnDawn] = useState<any>({
    b: 0,
    // console.log({ selfPawnDawnEntries, opponentDawnEntries });
    k: 0,
    n: 0,
    p: 0,
    q: 0,
    r: 0,
  });

  const [opponentPawnDawn, setOpponentPawnDawn] = useState<any>({
    b: 0,
    k: 0,
    n: 0,
    p: 0,
    q: 0,
    r: 0,
  });

  useEffect(() => {
    const chess = new Chess(chessPosition);

    const normal: any = {
      b: 2,
      k: 1,
      n: 2,
      q: 1,
      p: 8,
      r: 2,
    };

    const whiteDawn: any = {};
    const blackDawn: any = {};

    for (const piece of pieces) {
      for (const color of colors) {
        const total = chess.findPiece({
          color: color as any,
          type: piece as any,
        }).length;

        if (color == "w") {
          whiteDawn[piece] = normal[piece] - total;
        } else {
          blackDawn[piece] = normal[piece] - total;
        }
      }
    }

    if (selfColor == "while") {
      setSelfPawnDawn(whiteDawn);
      setOpponentPawnDawn(blackDawn);
    } else {
      setOpponentPawnDawn(whiteDawn);
      setSelfPawnDawn(blackDawn);
    }

    // console.log({ selfPawnDawn, opponentPawnDawn });
  }, [chessPosition, selfColor]);

//   const [selfPawnDawnEntries, setSelfPawnDawnEntries] = useState<any>([]);
//   const [opponentDawnEntries, setOpponentDawnEntries] = useState<any>([]);

//   useEffect(() => {
//     selfPawnDawn && setSelfPawnDawnEntries(Object.entries(selfPawnDawn));
//     opponentPawnDawn &&
//       setOpponentDawnEntries(Object.entries(opponentPawnDawn));
//   }, [selfPawnDawn, opponentPawnDawn]);

  useEffect(() => {
    setResultSelfPawnDawn(selfPawnDawn);
    setResultOpponentPawnDawn(opponentPawnDawn);
  }, [selfPawnDawn, opponentPawnDawn]);

  return {
    selfPawnDawn: resultSelfPawnDawn,
    opponentPawnDawn: resultOpponentPawnDawn,
  };
};
