import { useEffect, useRef, useState } from "react";
import {
  BtnToProfile,
  CardHistory,
  ProfileDashboard,
} from "../components/ui/common";
import MatchTypeMenu from "../components/ui/common/cards/card-matchTypeMenu";
import type { GameHistory, Player } from "../utils/types";
import { apiGetMe } from "../helpers/api";

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

  useEffect(() => {
    if (loaded.current === false) {
      fetch("/historyMatch.json")
        .then((response) => response.json())
        .then((data) => setLists(data))
        .then(() => (loaded.current = true));

      apiGetMe().then((user) => {
        setDataProfiles({
          country: user.country || '-',
          id: "1",
          rankScore: user.score,
          username: user.username || user.first_name,
        });
      });
    }

    return () => {
      console.log("clean up");
    };
  }, [loaded]);

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
