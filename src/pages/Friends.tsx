"use client";

import {
  BtnToProfile,
  ProfileDashboard,
  CardShare,
} from "../components/ui/common";
import { UserContext } from "../context/UserContext";
import { useCaller } from "../hooks/canister";
import { type Player } from "../utils/types";
import { useIdentity } from "@nfid/identitykit/react";
import { Search } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";

const dataProfile = {
  id: 0,
  username: "Guest",
  rankScore: "NaN",
  country: "-",
};

const dummyFriends: Player[] = [];
const dummyPlayers: Player[] = [
    { id: 1, username: "Firman Utina", rankScore: "NaN", country: "INDONESIA" },
    { id: 2, username: "Ole", rankScore: "NaN", country: "INDONESIA" },
    { id: 2, username: "Ole", rankScore: "NaN", country: "INDONESIA" },
    { id: 2, username: "Ole", rankScore: "NaN", country: "INDONESIA" },
    { id: 2, username: "Ole", rankScore: "NaN", country: "INDONESIA" },
    { id: 2, username: "Ole", rankScore: "NaN", country: "INDONESIA" },
];
const dummySuggestions: Player[] = [
    { id: 1, username: "Komeng", rankScore: "NaN", country: "INDONESIA" },
];

export default function Friends() {
  const [dataProfiles, setDataProfiles] = useState<Player>(dataProfile);

  const [activeTab, setActiveTab] = useState<"friends" | "players" | "suggestions">("friends");
  const [search, setSearch] = useState("");

  const loaded = useRef(false);
  const identity = useIdentity();
  const caller = useCaller();
  const user = useContext(UserContext);


  const getData = () => {
    if (activeTab === "friends") return dummyFriends;
    if (activeTab === "players") return dummyPlayers;
    if (activeTab === "suggestions") return dummySuggestions;
    return [];
  };

  const filtered = getData().filter(
    (p) =>
        p.username.toLowerCase().includes(search.toLowerCase()) ||
        p.country.toLowerCase().includes(search.toLowerCase())
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
          <CardShare />
          {/* <div className="flex flex-col gap-4 lg:gap-6 w-full md:max-w-xs">
            <CardShare text="Friend Link"/>
            <CardShare text="Send Email Invite"/>
          </div> */}
        </div>
        {/* Right Side: Search Friend */}
        <div className="flex gap-4 w-full">
          <div className="bg-primary text-white p-4 rounded-lg w-full border-2 border-[#1E1E1E]">
            {/* Search */}
            <div className="relative flex items-center mb-4 z-50">
              <Search className="absolute top-[20%] left-2 w-5 h-5 text-gray-300" />
              <input
                type="text"
                placeholder="Search by name or username"
                className="w-full rounded-md bg-[#1E1E1E] px-8 py-2 text-sm outline-none"
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
                Friends ({dummyFriends.length})
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "players"
                    ? "border-b-2 border-yellow-500 text-yellow-500"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("players")}
              >
                All Players ({dummyPlayers.length})
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "suggestions"
                    ? "border-b-2 border-yellow-500 text-yellow-500"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("suggestions")}
              >
                Suggestions ({dummySuggestions.length})
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
                        <div className="w-8 h-8 rounded-full bg-secondary"></div>
                        <div className="flex items-baseline space-x-2">
                            <p className="text-sm text-white">@{p.username}</p>
                            <span>-</span>
                            <span className="text-xs text-gray-100">{p.country}</span>
                        </div>
                      </div>
                      <button className="text-yellow-500 hover:text-yellow-400 text-sm">
                        {activeTab === "friends" ? "Remove" : "Add"}
                      </button>
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
  );
}
