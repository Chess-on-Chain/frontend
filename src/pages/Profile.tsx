import { useEffect, useRef, useState } from "react";
import { BtnEditProfile, CardHistory, CardProfile } from "../components/ui/common";
import type { GameHistory, Player } from "../utils/types";

const dataProfile = 
{
  id: 1,
  username: 'Firmansyah',
  rankScore: 500,
  country: 'IDN'
};

const Profile = () => {
  const [lists, setLists] = useState<GameHistory[]>([]);
  const [dataProfiles] = useState<Player>(dataProfile);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current === false) {
      fetch("/historyMatch.json")
        .then((response) => response.json())
        .then((data) => setLists(data))
        .then(() => (loaded.current = true));
    }

    return () => {
      console.log("clean up");
    };
  }, [loaded]);

  console.log(lists);
  return (
    <div className="profile-content">
      <div className="content">
        <div className="flex flex-col gap-12 lg:gap-14 w-full px-2 py-8 border-b border-white/20">
          {/* Profile Header */}
          <div className="flex justify-between items-center mb-6">
            <CardProfile data={dataProfiles} />
            <BtnEditProfile />
          </div>
        </div>
        <CardHistory data={lists} />
      </div>
    </div>
  );
};

export default Profile;
