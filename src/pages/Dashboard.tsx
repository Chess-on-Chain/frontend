import { useEffect, useRef, useState } from "react";
import {
  BtnToProfile,
  CardHistory,
  ProfileDashboard,
} from "../components/ui/common";
import MatchTypeMenu from "../components/ui/common/cards/card-matchTypeMenu";
import type { GameHistory, Player } from "../utils/types";
import { apiGetMe } from "../helpers/api";
import { useIdentity } from "@nfid/identitykit/react";
import { useCaller } from "../hooks/canister";

const dataProfile = {
  id: 0,
  username: "Guest",
  rankScore: "NaN",
  country: "-",
};

const Dashboard = () => {
  const [lists, setLists] = useState<GameHistory[]>([]);
  const [dataProfiles, setDataProfiles] = useState<Player>(dataProfile);
  const loaded = useRef(false);
  const identity = useIdentity();
  const caller = useCaller();

  useEffect(() => {
    if (!identity) {
      return;
    }

    if (loaded.current === false) {
      // fetch("/historyMatch.json")
      //   .then((response) => response.json())
      //   .then((data) => setLists(data))
      //   .then(() => (loaded.current = true));

      caller
        .get_histories(identity.getPrincipal(), 0, 20)
        .then((histories: any[]) => {
          const result: GameHistory[] = [];
          for (const history of histories.reverse()) {
            const date = new Date(Number(history.time / BigInt(10 ** 6)));

            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];

            const dayName = days[date.getDay()];
            const day = String(date.getDate()).padStart(2, "0");
            const month = months[date.getMonth()];
            const year = String(date.getFullYear()).slice(-2); // Ambil 2 digit terakhir

            let hour = date.getHours();
            const minute = String(date.getMinutes()).padStart(2, "0");
            const period = hour >= 12 ? "PM" : "AM";
            hour = hour % 12;
            hour = hour === 0 ? 12 : hour; // ubah 0 jadi 12 untuk format 12-jam

            const dateString = `${dayName}, ${day} ${month} ${year} ${hour}:${minute} ${period}`;

            const myColor =
              history.white_player.toText() == identity.getPrincipal().toText()
                ? "white"
                : "black";
            let status = "Draw";

            if (history.winner == "ongoing") return;
            if (history.winner == "draw") {
            } else if (history.winner == myColor) {
              status = "Victory";
            } else {
              status = "Defeat";
            }

            result.push({
              id: history.id,
              date: dateString,
              moves: history.moves.length,
              players: [],
              result: status,
            });
          }

          setLists(result);
        });

      apiGetMe().then((user) => {
        setDataProfiles({
          country: user.country || "-",
          id: "1",
          rankScore: user.score,
          username: user.username || user.first_name,
        });
      });
    }

    return () => {
      console.log("clean up");
    };
  }, [loaded, identity]);

  return (
    <div className="dashboard-content">
      <div className="content">
        {/* Left Side: Cards */}
        <div className="flex flex-col gap-12 lg:gap-14 w-full md:max-w-xs">
          {/* Profile Header */}
          <div className="flex justify-between items-center">
            <ProfileDashboard data={dataProfiles} />
            <BtnToProfile />
          </div>
          {/* Section - Match Type Menu */}
          <MatchTypeMenu />
        </div>
        {/* Right Side: Game History */}
        <CardHistory data={lists} />
      </div>
    </div>
  );
};

export default Dashboard;
