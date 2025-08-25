import {
  useAuth,
  useIdentity,
  useIsInitializing,
} from "@nfid/identitykit/react";
import { createContext, useEffect, useRef, useState } from "react";
import { useCaller } from "../hooks/canister";
import { apiGetUser, type User } from "../helpers/api";

export const UserContext = createContext<User | undefined>(undefined);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | undefined>();
  const auth = useAuth();
  const initializing = useIsInitializing();
  const actor = useCaller();
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
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
        loaded.current = true;
      };

      login();
    }
  }, [initializing, auth.user]);

  const identity = useIdentity();

  useEffect(() => {
    if (!identity) return;
    if (identity.getPrincipal().toText() == "2vxsx-fae") {
      auth.disconnect();
    }
  }, [identity]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
