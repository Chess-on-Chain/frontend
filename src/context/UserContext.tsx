import {
  useAuth,
  useIdentity,
  useIsInitializing,
} from "@nfid/identitykit/react";
import { createContext, useEffect, useRef, useState } from "react";
import { useCaller } from "../hooks/canister";
import { apiGetUser, type User } from "../helpers/api";
import { toast, type Id } from "react-toastify";

export const UserContext = createContext<User | undefined>(undefined);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | undefined>();
  const auth = useAuth();
  const initializing = useIsInitializing();
  const actor = useCaller();
  const loaded = useRef(false);
  const toastLoaded = useRef(false);
  let toastId = useRef<Id | null>(null);

  useEffect(() => {
    if (toastLoaded.current) return;
    toastId.current = toast.info("Please wait...", {
      isLoading: true,
      autoClose: false,
    });
    toastLoaded.current = true;
  }, []);

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
        toastId.current && toast.done(toastId.current);
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
