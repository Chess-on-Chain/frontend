import { useState, useMemo } from "react";
import { useIdentity } from "@nfid/identitykit/react";
import { HttpAgent } from "@dfinity/agent";
import { createActor } from "../helpers/canister_factory";
import type { _SERVICE } from "../helpers/canister_factory/contract.did";

const ICP_API_HOST = import.meta.env.VITE_ICP_API_HOST as string;

export const useCaller = () => {
  const identity = useIdentity();
  const [actor, setActor] = useState<_SERVICE>();

  useMemo(async () => {
    if (!identity) return;
    if (identity.getPrincipal().isAnonymous()) return;

    const agent = HttpAgent.createSync({
      host: ICP_API_HOST,
      identity,
    });

    if (agent.isLocal()) {
      await agent.fetchRootKey();
    }

    // const actor = Actor.createActor(idlFactory, {
    //   agent,
    //   canisterId: import.meta.env.VITE_COC_CANISTER_ID as string,
    // });

    const actor = createActor(import.meta.env.VITE_COC_CANISTER_ID as string, {
      agent,
    });

    setActor(actor);
  }, [identity]);

  return actor;
};

export const useAnonymousCaller = () => {
  const agent = HttpAgent.createSync({
    host: ICP_API_HOST,
  });
  const actor = createActor(import.meta.env.VITE_COC_CANISTER_ID as string, {
    agent,
  });

  return actor;
};
