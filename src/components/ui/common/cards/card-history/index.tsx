import type { GameHistory } from "../../../../../utils/types";

type CardHistoryProps = {
  data: GameHistory[];
};

export default function CardHistory({ data }: CardHistoryProps) {
  return (
    <div className="flex-1 bg-[#151515] border border-white/20 rounded-lg p-4 h-auto min-h-[500px] max-h-screen">
      <h2 className="text-lg font-semibold mb-4 mx-2">
        Game History ({data.length})
      </h2>
      <div className="overflow-x-scroll hide-scrollbar">
        <table className="w-full text-sm border-separate border-spacing-y-2 table-auto">
          <thead className="text-left text-xs sm:text-sm md:text-base text-white/60 border-b border-white/20 bg-primary">
            <tr className="bg-primary rounded-xs">
              <th className="p-4">Date</th>
              <th className="p-4">Players</th>
              <th className="p-4">Result</th>
              <th className="p-4">Moves</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((game) => (
              <tr className="bg-transparent" key={game.id}>
                <td className="px-4">{game.date}</td>
                <td className="px-2">
                  <div className="flex flex-col">
                    {game.players.map((player, index) => (
                      <span key={player.id}>
                        {index === 0 ? "⚫" : "⚪"} @{player.username} ({player.rankScore}){" "}
                        <span className="text-white/50">{player.country}</span>
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4">{game.result}</td>
                <td className="px-4">{game.moves}</td>
                <td
                  className={`px-4 font-bold ${
                    game.status === "Winner" ? "text-yellow-400" : "text-red-500"
                  }`}
                >
                  {game.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
