import { useContext, useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import Board from "../components/ui/common/board/Board";
import { Flag } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import { useCaller } from "../hooks/canister";
import { apiCancelRoom, apiCreateOrJoinRoom, apiGetMe } from "../helpers/api";
import { BoardContext } from "../context/BoardContext";

interface MoveData {
  from_position: string;
  to_position: string;
  piece: string;
}

interface LayoutProps {
  // chessGame: any;
  handleSelfMove: (move: MoveData) => Promise<void>;
  boardOrientation: "white" | "black";
}

const Gameplay = () => {
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    "white"
  );

  const [matchId, setMatchId] = useState("");
  const [canPlay, setCanPlay] = useState(false);
  const [errorText, setErrorText] = useState<string | undefined>();

  const [matchStatus, setMatchStatus] = useState("ongoing");

  const caller: any = useCaller();

  const chessRef = useRef(new Chess());
  const chessGame = chessRef.current;

  const [, setChessPosition] = useContext(BoardContext);

  useEffect(() => {
    if (!caller) return;

    setChessPosition(chessGame.fen());

    const startWatchingMatch = async (
      x: string,
      orientation: "black" | "white"
    ) => {
      // const zeroOrOne = orientation == "white" ? 0 : 1;

      let totalMove = 0;
      while (true) {
        const match = await caller.get_match(x);
        const moves: any[] = match["moves"];

        if (moves.length == totalMove) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }

        // if (moves.length % 2 === zeroOrOne) {
        //   const last_move = moves[moves.length - 1];
        //   // chessGame.move({
        //   //   from: last_move.from_position.toLowerCase(),
        //   //   to: last_move.to_position.toLowerCase(),
        //   // });
        //   setChessPosition(chessGame.fen());
        // }
        setChessPosition(match["fen"]);

        if (match["winner"] == orientation) {
          setMatchStatus("win");
        } else if (
          match["winner"] == (orientation == "white" ? "black" : "white")
        ) {
          setMatchStatus("lost");
        }

        totalMove = moves.length;

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    caller.get_caller_match().then((match: any[]) => {
      if (match.length >= 1) {
        setErrorText("Previous game session not finished");
        return;
      }

      apiGetMe().then(async (user) => {
        const matchServer = await apiCreateOrJoinRoom();

        if (matchServer.match_id) {
          const match = await caller.get_match(matchServer.match_id);
          // console.log(match, match["black_player"]["id"].toText(), user["id"]);
          let color: "white" | "black" = "white";

          if (match["black_player"]["id"].toText() === user["id"]) {
            setBoardOrientation("black");
            color = "black";
          }
          setCanPlay(true);
          setMatchId(matchServer.match_id);
          startWatchingMatch(matchServer.match_id, color);
        } else {
          const interval = setInterval(async () => {
            let match = await caller.get_caller_match();
            console.log(match);
            if (match.length >= 1) {
              match = match[0];
              let color: "white" | "black" = "white";

              if (match["black_player"]["id"].toText() === user["id"]) {
                color = "black";
                setBoardOrientation("black");
              }
              setCanPlay(true);
              setMatchId(match["id"]);
              startWatchingMatch(match["id"], color);
              clearInterval(interval);
            }
          }, 2000);
        }
      });
    });
  }, [caller]);

  const isMobile = useIsMobile();

  const handleSelfMove = async ({
    from_position,
    to_position,
  }: {
    from_position: string;
    to_position: string;
    piece: string;
  }) => {
    new Audio("/audio/move.mp3").play();
    console.log(
      await caller.add_match_move(matchId, from_position, to_position, "0")
    );
  };

  return (
    <>
      {errorText && (
        <div className="fixed h-screen w-full top-0 right-0 bg-black/70 z-50 flex items-center">
          <div className="w-full">
            <p className="text-center text-2xl text-red-200 ">{errorText}</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-blue-400 text-black text-xl px-3 py-1 rounded m-2 mx-auto block cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      )}
      {!canPlay && !errorText && (
        <div className="fixed h-screen w-full top-0 right-0 bg-black/70 z-50 flex items-center">
          <div className="w-full">
            <p className="text-center text-xl">Waiting opponent...</p>
            <button
              className="bg-red-400 text-black text-xl px-3 py-1 rounded m-2 mx-auto block cursor-pointer"
              onClick={() => {
                apiCancelRoom().then(() => {
                  window.location.href = "/";
                });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {matchStatus == "win" && (
        <div className="fixed h-screen w-full top-0 right-0 bg-black opacity-70 z-50 flex items-center">
          <div className="w-full">
            <p className="text-center text-green-500 text-xl">Victory</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-blue-400 text-black text-xl px-3 py-1 rounded m-2 mx-auto block cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      )}
      {matchStatus == "lose" && (
        <div className="fixed h-screen w-full top-0 right-0 bg-black opacity-70 z-50 flex items-center">
          <div className="w-full">
            <p className="text-center text-red-500 text-xl">Defeat</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-blue-400 text-black text-xl px-3 py-1 rounded m-2 mx-auto block cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full mx-auto">
        {isMobile ? (
          <MobileLayout
            boardOrientation={boardOrientation}
            handleSelfMove={handleSelfMove}
          />
        ) : (
          <DesktopLayout
            boardOrientation={boardOrientation}
            handleSelfMove={handleSelfMove}
          />
        )}
      </div>
    </>
  );
};

const MobileLayout: React.FC<LayoutProps> = ({
  handleSelfMove,
  boardOrientation,
}) => {
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
          boardOrientation={boardOrientation}
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

const DesktopLayout: React.FC<LayoutProps> = ({ handleSelfMove }) => {
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
