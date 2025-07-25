import { useContext, useEffect, useRef, useState } from "react";
import {
  BtnEditProfile,
  CardHistory,
  CardProfile,
} from "../components/ui/common";
import type { GameHistory, Player } from "../utils/types";
import { useAuth } from "@nfid/identitykit/react";
import { useCaller } from "../hooks/canister";
import { UserContext } from "../context/UserContext";

const dataProfile = {
  id: "",
  username: "Guest",
  rankScore: "NaN",
  country: "-",
};

const Profile = () => {
  const [lists, setLists] = useState<GameHistory[]>([]);
  const [dataProfiles, setDataProfiles] = useState<Player>(dataProfile);
  // const loaded = useRef(false);
  const auth = useAuth();
  const caller = useCaller();

  const user = useContext(UserContext);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;

    if (user) {
      setDataProfiles({
        country: user.country || "-",
        id: "1",
        rankScore: user.score,
        username: user.username || user.first_name,
      });
    }

    if (!auth.user) {
      return;
    }
    
    loaded.current = true;

    caller
      .get_histories(auth.user.principal, 0, 20)
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
            history.white_player.toText() == auth.user?.principal.toText()
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

    return () => {
      console.log("clean up");
    };
  }, [user, auth]);

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
