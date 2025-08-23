import { useAuth, useIsInitializing } from "@nfid/identitykit/react";
import { createContext, useEffect, useState } from "react";
import { useCaller } from "../hooks/canister";
import { apiGetUser, type User } from "../helpers/api";

export const UserContext = createContext<User | undefined>(undefined);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | undefined>();
  const auth = useAuth();
  const initializing = useIsInitializing();
  const actor = useCaller();

  useEffect(() => {
    if (!initializing && auth.user) {
      let auth_user = auth.user.principal;

      const login = async () => {
        try {
          let result = await apiGetUser(auth_user);
          setUser(result);
        } catch (e) {
          await actor?.register();
          await login();
        }
      };

      login();
    }
  }, [initializing]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
