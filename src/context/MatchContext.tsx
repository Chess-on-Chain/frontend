import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../helpers/api";
import { UserContext } from "./UserContext";

export const MatchContext = createContext<{
  self: User | undefined;
  opponent: User | undefined;
  setOpponent: ((user: User) => void) | undefined;
  selfColor: string | undefined;
  setSelfColor: ((color: "white" | "black") => void) | undefined;
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
