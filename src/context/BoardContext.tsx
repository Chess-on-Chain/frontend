import { createContext, useState } from "react";

export const BoardContext = createContext<
  [
    string,
    (fen: string) => void,
    "white" | "black",
    (fen: "white" | "black") => void
  ]
>(["8/8/4K3/8/4k3/8/8/8 b - - 0 1", () => {}, "white", () => {}]);

export function BoardProvider({ children }: any) {
  const [chessPosition, setChessPosition] = useState(
    "8/8/4K3/8/4k3/8/8/8 b - - 0 1"
  );

  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    "white"
  );

  return (
    <BoardContext.Provider
      value={[
        chessPosition,
        setChessPosition,
        boardOrientation,
        setBoardOrientation,
      ]}
    >
      {children}
    </BoardContext.Provider>
  );
}
