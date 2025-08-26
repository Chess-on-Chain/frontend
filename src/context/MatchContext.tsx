import { createContext, useEffect, useState } from "react";
import type { User } from "../helpers/api";
import useUser from "../hooks/useUser";

export const MatchContext = createContext<{
  self?: User;
  opponent?: User;
  setOpponent?: (user: User) => void;
  selfColor?: string;
  setSelfColor?: (color: "white" | "black") => void;
}>({});

export function MatchProvider({ children }: any) {
  const [self, setSelf] = useState<User | undefined>();
  const [opponent, setOpponent] = useState<User | undefined>();
  const [selfColor, setSelfColor] = useState<string | undefined>();

  const user = useUser();

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
