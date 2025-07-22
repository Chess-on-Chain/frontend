import { useEffect, useRef, useState } from "react";
import { BtnToProfile, CardHistory, ProfileDashboard } from "../components/ui/common";
import MatchTypeMenu from "../components/ui/common/cards/card-matchTypeMenu";
import type { GameHistory, Player } from "../utils/types";

const dataProfile = 
{
  id: 1,
  username: 'Firmansyah',
  rankScore: 500,
  country: 'IDN'
};

const Dashboard = () => {
  const [lists, setLists] = useState<GameHistory[]>([])
  const [dataProfiles] = useState<Player>(dataProfile);
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current === false) {
      fetch("/historyMatch.json")
        .then((response) => response.json())
        .then((data) => setLists(data))
        .then(() => loaded.current = true)
    }

    return () => {
      console.log('clean up');
    }
  }, [loaded])

  console.log(lists);

  return (
    <div className="dashboard-content">
      <div className="content">
        {/* Left Side: Cards */}
        <div className="flex flex-col gap-12 lg:gap-14 w-full md:max-w-xs">
          {/* Profile Header */}
          <div className="flex justify-between items-center">
            <ProfileDashboard data={dataProfiles}/>
            <BtnToProfile />
          </div>
          {/* Section - Match Type Menu */}
          <MatchTypeMenu />
        </div>
        {/* Right Side: Game History */}
        <CardHistory data={lists}/>
      </div>
    </div>
  );
};

export default Dashboard;
