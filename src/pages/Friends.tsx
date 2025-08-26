import { Principal } from "@dfinity/principal";
import {
  BtnToProfile,
  ProfileDashboard,
  CardShare,
} from "../components/ui/common";
import { UserContext } from "../context/UserContext";
import type { User } from "../helpers/api";

import { useCaller } from "../hooks/canister";
// import { useCaller } from "../hooks/canister";
import { type Player } from "../utils/types";
import { useIdentity } from "@nfid/identitykit/react";
import { Search } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import type { Result_7 } from "../helpers/canister_factory/contract.did";
import { getCountry } from "../helpers/country";
import PhotoProfile from "../components/ui/common/image/PhotoProfile";
import { Buffer } from "buffer";
import { PopupLayout } from "../components/ui/layout/PopupLayout";

const dataProfile = {
  id: 0,
  username: "Guest",
  rankScore: "NaN",
  country: "-",
};

export default function Friends() {
  const [dataProfiles, setDataProfiles] = useState<Player>(dataProfile);

  const [activeTab, setActiveTab] = useState<
    "friends" | "players" | "suggestions"
  >("friends");
  const [search, setSearch] = useState("");

  const loaded = useRef(false);
  const identity = useIdentity();
  const actor = useCaller();
  const user = useContext(UserContext);

  const [friends, setFriends] = useState<User[]>([]);
  const [incomingFriends, setIncomingFriends] = useState<User[]>([]);

  const friendsRef = useRef<User[]>([]);
  const incomingFriendsRef = useRef<User[]>([]);

  const getFriends = (result: Result_7) => {
    if ("ok" in result) {
      const _friends = result.ok.map((u) => {
        const [firstName, lastName] = u.fullname.split(" ", 2);
        let photo: string | undefined;

        if (u.photo.length == 1) {
          photo = Buffer.from(u.photo[0]).toString("hex");
        }

        const user: User = {
          first_name: firstName,
          last_name: lastName,
          country: u.country[0],
          id: u.id,
          photo_id: photo,
          score: u.score,
          username: u.username[0],
        };
        return user;
      });
      return _friends;
    }
  };

  useEffect(() => {
    if (user) {
      actor?.get_friends(Principal.fromText(user.id), false).then((result) => {
        const _friends = getFriends(result);
        setFriends(_friends || []);
      });

      actor?.get_friends(Principal.fromText(user.id), true).then((result) => {
        const _friends = getFriends(result);
        setIncomingFriends(_friends || []);
      });
    }
  }, [user]);

  useEffect(() => {
    friendsRef.current = friends;
    incomingFriendsRef.current = incomingFriends;
    console.log(incomingFriends);
  }, [friends, incomingFriends]);

  const getData = () => {
    if (activeTab === "friends") return friendsRef.current;
    if (activeTab === "players") return incomingFriendsRef.current;
    return [];
  };

  const filtered = getData().filter(
    (p) =>
      (p.username || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.country || "").toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (user) {
      setDataProfiles({
        id: "1",
        username: user.username || user.first_name,
        rankScore: user.score,
        country: user.country || "-",
      });
    }

    if (!identity) return;

    return () => {
      console.log("Clean up");
    };
  }, [loaded, identity, user]);

  return (
    <>
      <PopupLayout />
      <div className="dashboard-content">
        <div className="content">
          {/* Left Side: Cards */}
          <div className="flex flex-col gap-12 lg:gap-14 w-full md:max-w-xs">
            {/* Profile Header */}
            <div className="flex justify-between items-center">
              <ProfileDashboard data={dataProfiles} />
              <BtnToProfile />
            </div>
            {/* Section - Share Type Menu */}
            <div className="flex flex-col gap-4 w-full md:max-w-xs lg:gap-6">
              {/* <CardShare
              type="link"
              title="Friend Link"
              icon="/Friend-Link.png"
              link="https://link.chessonchain.com/friend/90yoyoy" 
            /> */}
              <CardShare
                type="email"
                title="Add Friend"
                icon="/Email-Link.png"
              />
            </div>
            {/* <div className="flex flex-col gap-4 lg:gap-6 w-full md:max-w-xs">
            <CardShare text="Friend Link"/>
            <CardShare text="Send Email Invite"/>
          </div> */}
          </div>
          {/* Right Side: Search Friend */}
          <div className="flex gap-4 w-full">
            <div className="bg-primary text-white p-4 rounded-lg w-full border-2 border-[#1E1E1E]">
              {/* Search */}
              <div className="relative flex items-center mb-4">
                <Search className="absolute top-[20%] left-2 w-5 h-5 text-gray-300" />
                <input
                  type="text"
                  placeholder="Search by name or username"
                  className="w-full rounded-md bg-[#1E1E1E] px-9 py-2 text-sm outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="ml-2 text-gray-400 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#1E1E1E] mb-3 text-sm">
                <button
                  className={`px-4 py-2 ${
                    activeTab === "friends"
                      ? "border-b-2 border-yellow-500 text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("friends")}
                >
                  Friends ({friends.length})
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTab === "players"
                      ? "border-b-2 border-yellow-500 text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("players")}
                >
                  Incoming Friends ({incomingFriends.length})
                </button>
              </div>

              {/* List */}
              <div className="min-h-[200px] flex flex-col items-center text-gray-400">
                {filtered.length === 0 ? (
                  <p className="text-center my-20">
                    {activeTab === "friends"
                      ? "Add friends and their names will appear here."
                      : "No results found."}
                  </p>
                ) : (
                  <ul className="w-full">
                    {filtered.map((p) => (
                      <li
                        key={p.id}
                        className="flex justify-between items-center px-3 py-2 hover:bg-[#1E1E1E] rounded-md"
                      >
                        <div className="flex items-center space-x-2">
                          {/* <div className="w-8 h-8 rounded-full bg-secondary"></div> */}
                          <PhotoProfile
                            fileId={p.photo_id}
                            classSize="w-8 h-8"
                          />
                          <div className="flex items-baseline space-x-2">
                            <p className="text-sm text-white">
                              {p.username || p.first_name}
                            </p>
                            {p.country && <span>-</span>}
                            <span className="text-xs text-gray-100">
                              {p.country && getCountry(p.country)?.flag}
                            </span>
                          </div>
                        </div>
                        {activeTab === "friends" && (
                          <button
                            onClick={async () => {
                              const result = await actor?.invite_match(
                                Principal.fromText(p.id)
                              );
                              console.log(result);
                            }}
                            className="text-yellow-500 hover:text-yellow-400 text-sm cursor-pointer"
                          >
                            Invite to match
                          </button>
                        )}
                        {activeTab !== "friends" && (
                          <button
                            onClick={() => {
                              actor
                                ?.accept_friendship(Principal.fromText(p.id))
                                .then(() => {
                                  window.location.reload();
                                });
                            }}
                            className="text-yellow-500 hover:text-yellow-400 text-sm cursor-pointer"
                          >
                            Confirm
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* <CardHistory data={lists} /> */}
          </div>
        </div>
      </div>
    </>
  );
}
