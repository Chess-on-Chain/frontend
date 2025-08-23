// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import type { User } from "@/helpers/api";
// import { UserContext } from "@/context/UserContext";

// type PlayerColor = "white" | "black";

// type MatchContextType = {
//   self: User | undefined;
//   opponent: User | undefined;
//   setOpponent: (user: User | undefined) => void;
//   selfColor: PlayerColor | undefined;
//   setSelfColor: (color: PlayerColor) => void;
// };

// export const MatchContext = createContext<MatchContextType | undefined>(undefined);

// export function MatchProvider({ children }: { children: ReactNode }) {
//   const [self, setSelf] = useState<User | undefined>();
//   const [opponent, setOpponent] = useState<User | undefined>();
//   const [selfColor, setSelfColor] = useState<PlayerColor | undefined>();

//   const user = useContext(UserContext);

//   useEffect(() => {
//     setSelf(user);
//   }, [user]);

//   return (
//     <MatchContext.Provider
//       value={{ self, opponent, setOpponent, selfColor, setSelfColor }}
//     >
//       {children}
//     </MatchContext.Provider>
//   );
// }

// // custom hook biar lebih aman
// export function useMatchContext() {
//   const context = useContext(MatchContext);
//   if (!context) {
//     throw new Error("useMatchContext must be used within a MatchProvider");
//   }
//   return context;
// }

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../helpers/api";
import { UserContext } from "./UserContext";

export const MatchContext = createContext<{
  self: User | undefined;
  opponent: User | undefined;
  setOpponent: (user: User) => void | undefined;
  selfColor: string | undefined;
  setSelfColor: (color: "white" | "black") => void | undefined;
}>({} as any);

export function MatchProvider({ children }: any) {
  const [self, setSelf] = useState<User | undefined>();
  const [opponent, setOpponent] = useState<User | undefined>();
  const [selfColor, setSelfColor] = useState<string | undefined>();

  const user = useContext(UserContext);

  useEffect(() => {
    setSelf(user);
  }, [user]);

  return (
    <MatchContext.Provider
      value={{ self, opponent, setOpponent, selfColor, setSelfColor }}
    >
      {children}
    </MatchContext.Provider>
  );
}
