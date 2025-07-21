import type { Player } from "../../../../../../utils/types";

type ProfileProps = {
    data: Player;
};

export default function Profile({ data }: ProfileProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-gradient-to-t from-[#614126] to-[#a47f55]" />
      <div className="text-sm lg:space-y-1">
        <div className="flex items-center gap-1 text-white/90">
          <span className="lg:text-base font-semibold">{data.username}</span>
          <span className="w-1 h-1 bg-white/50 rounded-full" />
          <span className="text-white/50 text-xs">{data.country}</span>
        </div>
        <div className="text-xs text-white/60">
          Score: <span className="font-semibold text-secondary">{data.rankScore}</span>
        </div>
      </div>
    </div>
  );
}
