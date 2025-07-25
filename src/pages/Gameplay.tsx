import { useContext, useEffect, useState } from "react";
// import { Chess } from "chess.js";
import Board from "../components/ui/common/board/Board";
import { Flag } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import { useCaller } from "../hooks/canister";
import {
  apiCancelRoom,
  apiCreateOrJoinRoom,
  apiGetMe,
  apiGetUser,
  type User,
} from "../helpers/api";
import { BoardContext } from "../context/BoardContext";
import { useIdentity } from "@nfid/identitykit/react";
import { UserContext } from "../context/UserContext";
import { MatchContext } from "../context/MatchContext";
import { useMatchTimer } from "../hooks/timer";
import { usePawnDawn } from "../hooks/pawnDawn";

interface MoveData {
  from_position: string;
  to_position: string;
  piece: string;
}

interface LayoutProps {
  handleSelfMove: (move: MoveData) => Promise<void>;
  user: User;
}

const Gameplay = () => {
  const { setSelfColor } = useContext(MatchContext);

  const [, setChessPosition, boardOrientation, setBoardOrientation] =
    useContext(BoardContext);

  useEffect(() => {
    setSelfColor && setSelfColor(boardOrientation);
  }, [boardOrientation]);

  const [matchId, setMatchId] = useState("");
  const [canPlay, setCanPlay] = useState(false);
  const [errorText, setErrorText] = useState<string | undefined>();

  const [matchStatus, setMatchStatus] = useState("ongoing");

  const user = useContext(UserContext);
  // const [opponentUser, setOpponentUser] = useState<User | undefined>();
  const { setOpponent: setOpponentUser } = useContext(MatchContext);

  const caller: any = useCaller();

  // const chessRef = useRef(new Chess());
  // const chessGame = chessRef.current;
  const identity = useIdentity();

  useEffect(() => {
    let loaded = true;
    if (!caller) return;

    // setChessPosition(chessGame.fen());

    const startWatchingMatch = async (
      x: string,
      orientation: "black" | "white"
    ) => {
      let totalMove = 0;
      while (loaded) {
        const match = await caller.get_match(x);
        const moves: any[] = match["moves"];

        if (match["winner"] == orientation) {
          setMatchStatus("win");
          setChessPosition(match["fen"]);
          break;
        } else if (
          match["winner"] == (orientation == "white" ? "black" : "white")
        ) {
          setMatchStatus("lose");
          setChessPosition(match["fen"]);
          break;
        }

        if (moves.length == totalMove) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          continue;
        }

        setChessPosition(match["fen"]);

        totalMove = moves.length;

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    };

    caller.get_caller_match().then(async (matchOpt: any[]) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (matchOpt.length >= 1) {
        const user = await apiGetMe();
        let color: "white" | "black" = "white";
        const match = matchOpt[0];
        console.log(user, match["black_player"]["id"].toText());
        if (match.black_player.id.toText() == user.id) {
          setBoardOrientation("black");
          color = "black";
        }
        setChessPosition(match.fen);
        setCanPlay(true);
        setMatchId(match.id);
        startWatchingMatch(match.id, color);
        return;
      }

      if (identity?.getPrincipal().isAnonymous()) {
        setErrorText("Wallet is not connected properly");
        return;
      }

      apiGetMe().then(async (user) => {
        const matchServer = await apiCreateOrJoinRoom();
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (matchServer.match_id) {
          const match = await caller.get_match(matchServer.match_id);
          setChessPosition(match.fen);

          // console.log(match, match["black_player"]["id"].toText(), user["id"]);
          let color: "white" | "black" = "white";

          console.log(
            user.id,
            match.black_player.id.toText(),
            match.white_player.id.toText()
          );
          if (match.black_player.id.toText() == user.id) {
            setBoardOrientation("black");
            color = "black";

            setOpponentUser &&
              setOpponentUser(await apiGetUser(match.white_player.id.toText()));
          } else {
            setOpponentUser &&
              setOpponentUser(await apiGetUser(match.black_player.id.toText()));
          }

          setCanPlay(true);
          setMatchId(matchServer.match_id);
          startWatchingMatch(matchServer.match_id, color);
        } else {
          const interval = setInterval(async () => {
            let match = await caller.get_caller_match();
            // console.log(match);
            if (match.length >= 1) {
              match = match[0];
              let color: "white" | "black" = "white";
              console.log(
                user.id,
                match.black_player.id.toText(),
                match.white_player.id.toText()
              );

              if (match.black_player.id.toText() === user.id) {
                color = "black";
                setBoardOrientation("black");

                setOpponentUser &&
                  (await apiGetUser(match.white_player.id.toText()));
              } else {
                setOpponentUser &&
                  setOpponentUser(
                    await apiGetUser(match.black_player.id.toText())
                  );
              }
              setCanPlay(true);
              setChessPosition(match.fen);
              setMatchId(match["id"]);
              startWatchingMatch(match["id"], color);
              clearInterval(interval);
            }
          }, 2000);
        }
      });
    });

    return () => {
      loaded = false;
    };
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
          <div className="w-full space-y-6">
            <p className="text-center text-xl">Waiting opponent...</p>
            <button
              className="bg-red-500 text-black font-semibold text-xl leading-8 px-3 py-1 rounded m-2 mx-auto block cursor-pointer"
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
        <div className="fixed h-screen w-full top-0 right-0 bg-black/70 z-50 flex items-center">
          <div className="w-full space-y-8">
            <p className="text-center text-white font-medium text-3xl sm:text-5xl leading-20 sm:leading-24 bg-linear-to-l from-white/0 from-20% via-[#fdda13bb] via-50% to-white/0 to-80%">
              Victory
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-secondary text-black text-xl px-3 py-1 rounded m-2 mx-auto block cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      )}
      {matchStatus == "lose" && (
        <div className="fixed h-screen w-full top-0 right-0 bg-black/70 z-50 flex items-center">
          <div className="w-full space-y-8">
            <p className="text-center text-white font-medium tracking-wide text-3xl sm:text-5xl leading-20 sm:leading-24 bg-linear-to-l from-white/10 from-0% via-red-600 via-20% to-white/10 to-100%">
              Defeat
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-secondary text-black text-xl px-3 py-1 rounded m-2 mx-auto block cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full mx-auto">
        {isMobile ? (
          <MobileLayout user={user as User} handleSelfMove={handleSelfMove} />
        ) : (
          <DesktopLayout user={user as User} handleSelfMove={handleSelfMove} />
        )}
      </div>
    </>
  );
};

const MobileLayout: React.FC<LayoutProps> = ({ handleSelfMove }) => {
  const actor = useCaller();
  const { self, opponent, selfColor } = useContext(MatchContext);
  const { timeColor, timeLeft } = useMatchTimer();
  const { selfPawnDawn, opponentPawnDawn } = usePawnDawn();

  const [opponentColor, setOpponentColor] = useState<
    "white" | "black" | undefined
  >();

  useEffect(() => {
    setOpponentColor(selfColor == "white" ? "black" : "white");
  }, [selfColor]);

  const pawnEmoji: any = {
    b: ["♗", "♝"],
    k: ["♔", "♚"],
    n: ["♘", "♞"],
    p: ["♙", "♟"],
    q: ["♕", "♛"],
    r: ["♖", "♜"],
  };

  return (
    <div className="lg:hidden w-full mx-auto py-10 flex flex-col items-center p-0 space-x-4 space-y-4 min-h-screen">
      {/* PLAYER 1 */}
      <div className="flex justify-between itmes-center space-x-2 w-full text-white text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-secondary"></div>
          <div>
            <p>{opponent?.username || opponent?.first_name || "-"}</p>
            <p className="text-white/50">{opponent?.country || "-"}</p>
          </div>
        </div>
        <div className="overflow-x-auto hide-scrollbar whitespace-nowrap text-white flex flex-1 items-center gap-2 ml-1 px-2 text-sm">
          {opponentPawnDawn &&
            Object.entries(opponentPawnDawn).map(
              ([piece, total]: [any, any]) => {
                return (
                  <div key={piece} className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <span className="text-xs">{total}</span>{" "}
                    {pawnEmoji[piece][selfColor == "white" ? 1 : 0]}
                  </div>
                );
              }
            )}
        </div>
        {/* Timer Player 1 */}
        <div className="ml-2 px-3 pt-0.5 text-xl border border-secondary text-white/50">
          {timeColor == opponentColor ? timeLeft : "-:-"}
        </div>
      </div>

      <div className="aspect-square w-full max-w-[700px] bg-white">
        <Board onSelfMove={handleSelfMove} />
      </div>

      {/* PLAYER 2 */}
      <div className="flex justify-between items-center space-x-2 w-full text-sm text-white">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-secondary"></div>
          <div>
            <p>{self?.username || self?.first_name || "-"}</p>
            <p className="text-white/50">{self?.country || "-"}</p>
          </div>
        </div>
        <div className="overflow-x-auto hide-scrollbar whitespace-nowrap text-white flex flex-1 items-center gap-2 ml-1 px-2 text-sm">
          {selfPawnDawn &&
            Object.entries(selfPawnDawn).map(([piece, total]: [any, any]) => {
              return (
                <div key={piece} className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <span className="text-xs">{total}</span>{" "}
                  {pawnEmoji[piece][selfColor == "white" ? 0 : 1]}
                </div>
              );
            })}
        </div>
        {/* Timer Player 2 */}
        <div className="ml-2 px-3 pt-0.5 text-xl border border-secondary">
          {timeColor == selfColor ? timeLeft : "-:-"}
        </div>
      </div>

      {/* RESIGN BUTTON */}
      <div className="flex justify-center items-center w-full my-8">
        <button
          className="text-center block"
          onClick={() => {
            actor.resign();
          }}
        >
          <div className="p-3.5 rounded-full mb-1 5 mx-auto bg-secondary">
            {/* <Link to="/"> */}
            <Flag size={24} className="text-black" />
            {/* </Link> */}
          </div>
          <p className="text-white">Resign</p>
        </button>
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
  const actor = useCaller();

  return (
    <div className="hidden lg:flex items-center justify-center w-full h-full space-x-4">
      {/* LEFT - RESIGN */}
      <div className="flex-1 h-full flex justify-center">
        <div className="flex justify-center items-center w-full lg:w-3/5 h-full">
          <button
            className="mx-auto text-center block"
            onClick={() => {
              actor && actor.resign();
            }}
          >
            <div className="p-4.5 mx-auto rounded-full mb-1 5 bg-secondary">
              <Link to="/">
                <Flag size={24} className="text-black" />
              </Link>
            </div>
            <p className="text-lg tracking-wide text-white">Resign</p>
          </button>
        </div>
      </div>

      {/* MIDDLE - BOARD */}
      <div className="aspect-square w-full max-w-[700px] bg-white">
        <Board
          // key={isMobile ? "mobile" : "desktop"}
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
