import { createContext, useEffect, useState } from "react";
import { apiGetMe, apiLogin, type User } from "../helpers/api";
import { useAuth, useIsInitializing } from "@nfid/identitykit/react";
import { useCaller } from "../hooks/canister";
import { sha1 } from "js-sha1";
import { Buffer } from "buffer";
export const UserContext = createContext<User | undefined>(undefined);

function randomBytes(length: number) {
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = Math.floor(Math.random() * 256); // 0 - 255
  }
  return bytes;
}

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | undefined>();
  // const signer = useSigner();
  const auth = useAuth();
  const initializing = useIsInitializing();
  const actor = useCaller();

  useEffect(() => {
    if (!initializing && auth.user) {
      const loginKey = Buffer.from(randomBytes(20));
      const loginKeyHex = loginKey.toString("hex");
      const loginKeyHashedHex = sha1(loginKey);

      const login = () => {
        const result = apiGetMe();
        result.then((user) => {
          setUser(user as User);
        });
        result.catch(() => {
          actor.login(loginKeyHashedHex).then(async () => {
            await apiLogin({
              token: loginKeyHex,
            });

            login();
          });
        });
      };

      login();
    }
  }, [auth, initializing]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
