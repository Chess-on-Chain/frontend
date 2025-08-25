import { useContext, useEffect, useRef, useState } from "react";
import Board from "../components/ui/common/board/Board";
import { Flag, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import { useCaller } from "../hooks/canister";
import { apiGetUser, type User } from "../helpers/api";
import { BoardContext } from "../context/BoardContext";
import { useIdentity } from "@nfid/identitykit/react";
import { UserContext } from "../context/UserContext";
import { MatchContext } from "../context/MatchContext";
import { getTimerColorClass, resetTimer, useMatchTimer } from "../hooks/timer";
import { usePawnDawn } from "../hooks/pawnDawn";
import type { Principal } from "@dfinity/principal";
import type { MatchResultHistory } from "../helpers/canister_factory/contract.did";
import pusher from "../helpers/pusher";
import type { Channel } from "pusher-js";
import * as WebsocketTypes from "./../types/WebsocketTypes";
import { IDL } from "@dfinity/candid";
import PhotoProfile from "../components/ui/common/image/PhotoProfile";
import { getCountry } from "../helpers/country";

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

  const [matchId, setMatchId] = useState<bigint>(0n);
  const [canPlay, setCanPlay] = useState(false);
  const [errorText, setErrorText] = useState<string | undefined>();
  const loaded = useRef(false);
  const boardOrientationRef = useRef(boardOrientation);

  const channelWebsocket = useRef<Channel | null>(null);

  const [matchStatus, setMatchStatus] = useState("ongoing");

  const user = useContext(UserContext);
  const { setOpponent: setOpponentUser } = useContext(MatchContext);

  const actor = useCaller();
  const identity = useIdentity();

  const init = async (caller: Principal) => {
    listenWebsocket(caller);

    const match = await actor?.get_active_match(caller);
    if (match) {
      if ("ok" in match) {
        await onMatchExists(caller, match.ok);
        return;
      } else if ("err" in match && match.err == "waiting for opponent") {
        return;
      }
    }

    await onCreateMatch(caller);
  };

  const onCreateMatch = async (caller: Principal) => {
    const result = await actor?.make_match(true);

    if (result && "ok" in result) {
      if ("match" in result.ok) {
        const match = result.ok.match;

        setMatchId(match.id);
        let opponent_principal = match.white_player;
        if (match.white_player.toText() == caller.toText()) {
          setBoardOrientation("white");
          opponent_principal = match.black_player;
        } else {
          setBoardOrientation("black");
        }

        let opponent_user = await apiGetUser(opponent_principal);
        setOpponentUser && setOpponentUser(opponent_user);
        setChessPosition(match.fen);
        setCanPlay(true);
        return;
      }
    }

    if (result && "err" in result) {
      setErrorText(result.err);
    }
  };

  const onMatchExists = async (
    caller: Principal,
    match: MatchResultHistory
  ) => {
    setMatchId(match.id);

    let opponent_principal = match.white_player;

    if (match.white_player.toText() == caller.toText()) {
      setBoardOrientation("white");
      opponent_principal = match.black_player;
    } else {
      setBoardOrientation("black");
    }

    let opponent_user = await apiGetUser(opponent_principal);
    setOpponentUser && setOpponentUser(opponent_user);

    let current_fen = match.moves.reverse()[0].fen; // last moves
    setChessPosition(current_fen);
    setCanPlay(true);
  };

  useEffect(() => {
    return () => {
      actor?.cancel_match_room();
      channelWebsocket.current?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setSelfColor && setSelfColor(boardOrientation);
    boardOrientationRef.current = boardOrientation;
  }, [boardOrientation]);

  useEffect(() => {
    if (loaded.current) return;
    if (!identity) return;
    if (identity.getPrincipal().isAnonymous()) return;
    if (identity.getPrincipal().toText() == "2vxsx-fae") return;

    init(identity.getPrincipal());

    loaded.current = true;
  }, [identity]);

  const listenWebsocket = (principal: Principal) => {
    console.log("WEBSOCKET LISTENING");
    const channel = pusher.subscribe(principal.toString());
    channelWebsocket.current = channel;

    channel.bind("match_created", async (data: any) => {
      const body = new Uint8Array(Object.values(data));
      const candid = WebsocketTypes.MatchCreatedCandid;

      const value = IDL.decode([candid], body);
      const match: WebsocketTypes.MatchCreated = value[0] as any;
      await onMatchCreated(principal, match);
    });

    channel.bind("move_created", async (data: any) => {
      const body = new Uint8Array(Object.values(data));
      const candid = WebsocketTypes.MoveCreatedCandid;

      const value = IDL.decode([candid], body);
      const move: WebsocketTypes.MoveCreated = value[0] as any;
      await onMoveCreated(move);
    });

    channel.bind("match_finished", async (data: any) => {
      const body = new Uint8Array(Object.values(data));
      const candid = WebsocketTypes.MatchFinishedCandid;

      const value = IDL.decode([candid], body);
      const match: WebsocketTypes.MatchFinished = value[0] as any;
      await onMatchFinished(match);
    });
  };

  const onMatchFinished = async (match: WebsocketTypes.MatchFinished) => {
    switch (match.winner) {
      case boardOrientationRef.current:
        setMatchStatus("win");
        break;
      case "draw":
        setMatchStatus("draw");
        break;
      default:
        setMatchStatus("lose");
    }
  };

  const onMatchCreated = async (
    caller: Principal,
    match: WebsocketTypes.MatchCreated
  ) => {
    setMatchId(match.match_id);

    const myOrientation: "black" | "white" =
      match.white_player.toText() == caller.toText() ? "white" : "black";

    let opponentPrincipal: Principal = match.white_player;
    if (myOrientation == "white") {
      opponentPrincipal = match.black_player;
    }

    const opponentUser = await apiGetUser(opponentPrincipal);

    setOpponentUser && setOpponentUser(opponentUser);
    setBoardOrientation(myOrientation);
    setChessPosition(match.fen);
    setCanPlay(true);
    resetTimer();
  };

  const onMoveCreated = async (move: WebsocketTypes.MoveCreated) => {
    setChessPosition(move.fen);
    new Audio("/audio/move.mp3").play().catch(() => {});
    resetTimer();
  };

  const isMobile = useIsMobile();

  const handleSelfMove = async ({
    from_position,
    to_position,
  }: {
    from_position: string;
    to_position: string;
    piece: string;
  }) => {
    try {
      await actor?.make_move(matchId, from_position, to_position, []);
    } catch (e: any) {
      if (
        e
          .toString()
          .includes("Langkah ini seharusnya promosi, tapi tidak diberikan")
      ) {
        await actor?.make_move(matchId, from_position, to_position, ["q"]);
      }
    }
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
                // apiCancelRoom().then(() => {
                //   window.location.href = "/";
                // });
                actor?.cancel_match_room().then(() => {
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
      {matchStatus == "draw" && (
        <div className="fixed h-screen w-full top-0 right-0 bg-black/70 z-50 flex items-center">
          <div className="w-full space-y-8">
            <p className="text-center text-white font-medium text-3xl sm:text-5xl leading-20 sm:leading-24 bg-linear-to-l from-white/0 from-20% via-[#fdda13bb] via-50% to-white/0 to-80%">
              Draw
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
          {/* <div className="w-8 h-8 rounded-full bg-secondary"></div> */}
          <PhotoProfile fileId={opponent?.photo_id} classSize="w-8 h-8" />
          <div>
            <p>{opponent?.username || opponent?.first_name || "-"}</p>
            <p className="text-white/50">
              {(opponent?.country && getCountry(opponent.country)?.flag) || "-"}
            </p>
          </div>
        </div>
        <div className="overflow-x-auto hide-scrollbar whitespace-nowrap text-white flex flex-1 items-center gap-2 ml-1 px-2 text-sm">
          {opponentPawnDawn &&
            Object.entries(opponentPawnDawn).map(
              ([piece, total]: [any, any]) => {
                return (
                  <div
                    key={piece}
                    className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1"
                  >
                    <span className="text-xs">{total}</span>{" "}
                    {pawnEmoji[piece][selfColor == "white" ? 1 : 0]}
                  </div>
                );
              }
            )}
        </div>
        {/* Timer Player 1 */}
        <div
          className={`ml-2 px-3 py-0.5 text-xl border 
            ${
              timeColor === opponentColor
                ? getTimerColorClass(timeLeft)
                : "border-secondary text-white/50"
            }
          `}
        >
          {/* {timeColor === opponentColor ? timeLeft : "-:-"} */}
          <Timer />
        </div>
      </div>

      <div className="aspect-square w-full max-w-[700px] bg-white">
        <Board onSelfMove={handleSelfMove} />
      </div>

      {/* PLAYER 2 */}
      <div className="flex justify-between items-center space-x-2 w-full text-sm text-white">
        <div className="flex items-center space-x-2">
          {/* <div className="w-8 h-8 rounded-full bg-secondary"></div> */}
          <PhotoProfile fileId={self?.photo_id} classSize="w-8 h-8" />
          <div>
            <p>{self?.username || self?.first_name || "-"}</p>
            {/* <p className="text-white/50">{self?.country || "-"}</p> */}
              {(self?.country && getCountry(self.country)?.flag) || "-"}

          </div>
        </div>
        <div className="overflow-x-auto hide-scrollbar whitespace-nowrap text-white flex flex-1 items-center gap-2 ml-1 px-2 text-sm">
          {selfPawnDawn &&
            Object.entries(selfPawnDawn).map(([piece, total]: [any, any]) => {
              return (
                <div
                  key={piece}
                  className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1"
                >
                  <span className="text-xs">{total}</span>{" "}
                  {pawnEmoji[piece][selfColor == "white" ? 0 : 1]}
                </div>
              );
            })}
        </div>
        {/* Timer Player 2 */}
        <div
          className={`ml-2 px-3 py-0.5 text-xl border 
            ${
              timeColor === selfColor
                ? getTimerColorClass(timeLeft)
                : "border-secondary text-white/50"
            } `}
        >
          {/* {timeColor === selfColor ? timeLeft : "-:-"} */}
          <Timer />
        </div>
      </div>

      {/* RESIGN BUTTON */}
      <div className="flex justify-center items-center w-full my-8">
        <button
          className="text-center block cursor-pointer"
          onClick={() => {
            actor?.resign();
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
            className="mx-auto text-center block cursor-pointer"
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
      <div className="opacity-0 flex-1 flex justify-center h-full py-4">
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
