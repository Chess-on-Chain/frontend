import type { Player } from "../../../../../../utils/types";

type ProfileProps = {
    data: Player;
};

export default function CardProfile({ data }: ProfileProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 lg:w-16 lg:h-16 rounded-full bg-gradient-to-t from-[#614126] to-[#a47f55]" />
      <div className="text-sm lg:space-y-0">
        <div className="flex items-center gap-1 text-white/90">
          <span className="text-base sm:text-2xl font-semibold">{data.username}</span>
          <span className="w-1 h-1 bg-white/50 rounded-full" />
          <span className="text-white/50 text-sm sm:text-xl">{data.country}</span>
        </div>
        <div className="text-sm sm:text-xl text-white/60">
          Score: <span className="font-semibold text-secondary">{data.rankScore}</span>
        </div>
      </div>
    </div>
  );
}
