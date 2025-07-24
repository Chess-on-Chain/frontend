import { useState, useMemo } from "react";
import { idlFactory } from "../helpers/idlFactory";
import { useIdentity } from "@nfid/identitykit/react";
import { Actor, HttpAgent } from "@dfinity/agent";

const ICP_API_HOST = import.meta.env.VITE_ICP_API_HOST as string;

export const useCaller = () => {
  const identity = useIdentity();
  const [actor, setActor] = useState<any>();

  useMemo(async () => {
    if (!identity) return;

    const agent = HttpAgent.createSync({
      host: ICP_API_HOST,
      identity,
    });

    if (agent.isLocal()) {
      await agent.fetchRootKey();
    }

    const actor = Actor.createActor(idlFactory, {
      agent,
      canisterId: import.meta.env.VITE_COC_CANISTER_ID as string,
    });

    setActor(actor);
  }, [identity]);

  return actor;
};

export const useAnonymousCaller = () => {
  const actor = Actor.createActor(idlFactory, {
    agent: new HttpAgent({
      host: ICP_API_HOST,
    }),
    canisterId: import.meta.env.VITE_COC_CANISTER_ID as string,
  });

  return actor;
};
