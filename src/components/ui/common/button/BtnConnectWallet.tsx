import {
  ConnectWallet,
  useAuth,
  useIsInitializing,
  useSigner,
} from "@nfid/identitykit/react";
import { useEffect } from "react";
import { Buffer } from "buffer";
import { apiGetMe, apiLogin, clearToken } from "../../../../helpers/api";
import { useCaller } from "../../../../hooks/canister";
import { sha1 } from "js-sha1";

function randomBytes(length: number) {
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = Math.floor(Math.random() * 256); // 0 - 255
  }
  return bytes;
}

export default function ConnectWalletBtn() {
  const actor = useCaller();
  const auth = useAuth();

  const initializing = useIsInitializing();
  const signer = useSigner();

  useEffect(() => {
    if (!actor) {
      return;
    }

    const login = async () => {
      clearToken();
      actor.login(loginKeyHashedHex).then(async () => {
        await apiLogin({
          token: loginKeyHex,
        });
      });
    };

    if (!initializing && !signer) {
      login();
    }
    const loginKey = Buffer.from(randomBytes(20));
    const loginKeyHex = loginKey.toString("hex");
    const loginKeyHashedHex = sha1(loginKey);

    apiGetMe()
      .then((user) => {
        if (auth.user?.principal.toText() != user.id) login();
      })
      .catch(() => login());
  }, [auth]);

  return (
    // <button className="connect-btn">
    //     {/* <Link timport { useIdentityKit } from "@nfid/identitykit/react";
    //     <ConnectWallet  />
    // </button>
    <ConnectWallet />
  );
}
