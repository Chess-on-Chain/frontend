import { createContext, useState } from "react";

export const BoardContext = createContext<[string, (fen: string) => void]>([
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  () => {},
]);

export function BoardProvider({ children }: any) {
  const [chessPosition, setChessPosition] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );

  return (
    <BoardContext.Provider value={[chessPosition, setChessPosition]}>
      {children}
    </BoardContext.Provider>
  );
}
