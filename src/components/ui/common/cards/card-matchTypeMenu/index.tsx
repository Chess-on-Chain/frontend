import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGetMe } from "../../../../../helpers/api";

export default function MatchTypeMenu() {
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    apiGetMe()
      .then((user) => {
        if (user) {
          setCanPlay(true);
        }
      })
      .catch(() => {});
  }, []);

  const [isError, setIsError] = useState(false);

  const activeClassName =
    "relative bg-wrap-card bg-no-repeat bg-cover bg-blend-darken rounded-lg border border-neutral-800 p-4 flex lg:flex-col justify-between items-center lg:items-start h-20 lg:h-[150px]";
  const nonActiveClassName =
    activeClassName + " opacity-60 pointer-events-none";

  return (
    <div className="flex flex-col gap-4 lg:gap-6 w-full md:max-w-xs">
      {/* Card 1 */}
      <div className={canPlay ? activeClassName : nonActiveClassName}>
        <div className="absolute top-0 left-0 w-full h-20 bg-primary/60 rounded-lg border border-neutral-800 p-4 flex lg:flex-col justify-between items-center lg:items-start lg:h-[150px]">
          <div className="text-left text-secondary text-shadow-secondary bg-primary italic font-medium px-2 py-1 text-lg lg:text-2xl border-2 border-secondary border-dashed">
            <Link to="/gameplay">
              Play Random <span className="text-lg lg:text-xl ml-1">▶</span>
            </Link>
          </div>
          <div className="w-12 h-12 lg:w-[76px] lg:h-[76px] bg-secondary rounded-full flex items-center lg:self-end justify-center">
            {isError ? (
              <span className="text-black text-2xl lg:text-5xl">🎲</span>
            ) : (
              <img
                src="/icon-game_random.svg"
                alt="Icon Game Random"
                className="w-11 h-11 sm:w-16 sm:h-16"
                onError={() => setIsError(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className={canPlay ? activeClassName : nonActiveClassName}>
        <div className="absolute top-0 left-0 w-full h-20 bg-primary/60 rounded-lg border border-neutral-800 p-4 flex lg:flex-col justify-between items-center lg:items-start lg:h-[150px]">
          <div className="text-left text-secondary text-shadow-secondary bg-primary italic font-medium px-2 py-1 text-lg lg:text-2xl border-2 border-secondary border-dashed">
            <Link to="/gameplay">
              Play a Friend <span className="text-lg lg:text-xl ml-1">▶</span>
            </Link>
          </div>
          <div className="w-12 h-12 lg:w-[76px] lg:h-[76px] bg-secondary rounded-full flex items-center lg:self-end justify-center">
            {isError ? (
              <span className="text-black text-2xl lg:text-4xl">👥</span>
            ) : (
              <img
                src="/icon-multiplayer.svg"
                alt="Icon Game Multiplayer"
                className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12"
                onError={() => setIsError(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
