import type { Player } from "../../../../../../utils/types";

type ProfileProps = {
    data: Player;
};

export default function CardProfile({ data }: ProfileProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-t from-[#614126] to-[#a47f55]" />
      <div>
        <div className="flex items-center gap-2 text-lg sm:text-xl lg:text-3xl font-semibold">
          {data.username}{" "}
          <span className="w-2 h-2 translate-y-0.5 bg-white/50 rounded-full" />
          <span className=" mt-1.5 text-sm sm:text-base lg:text-xl text-gray-400">
            {" "}
            {data.country}
          </span>
        </div>
        <div className="my-px lg:text-xl text-gray-400">
          Score: <span className="text-white">{data.rankScore}</span>
        </div>
        {/* <div className="flex items-center gap-3 mt-3 w-fit text-sm lg:text-base">
          <span className="text-white font-semibold">Rank: </span>
          <span className="px-2 py-0 5 font-bold w-fit text-sm lg:text-xl bg-accent text-black rounded-sm">
            {data.rankScore}
          </span>
        </div> */}
      </div>
    </div>
  );
}
