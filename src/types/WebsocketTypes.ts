import { IDL } from "@dfinity/candid";
import type { Principal } from "@dfinity/principal";

export const MatchCreatedCandid = IDL.Record({
  white_player: IDL.Principal,
  black_player: IDL.Principal,
  match_id: IDL.Nat64,
  fen: IDL.Text,
});

export interface MatchCreated {
  white_player: Principal;
  black_player: Principal;
  match_id: bigint;
  fen: string;
}

//   public type MoveCreatedMessage = {
//     // move_created
//     color : Text;
//     from_position : Text;
//     to_position : Text;
//     promotion : ?Text;
//     fen : Text;
//   };

export const MoveCreatedCandid = IDL.Record({
  color: IDL.Text,
  from_position: IDL.Text,
  to_position: IDL.Text,
  promotion: IDL.Opt(IDL.Text),
  fen: IDL.Text,
});

export interface MoveCreated {
  color: "black" | "white";
  from_position: string;
  to_positon: string;
  promotion: string | undefined;
  fen: string;
}

export const MatchFinishedCandid = IDL.Record({
  winner: IDL.Text,
});

export interface MatchFinished {
  winner: "white" | "black" | "draw";
}

// public type InviteMatchMessage = {
//   // invite_match
//   from : Principal;
// };
//   public type SendFriendshipMessage = {
//   // incoming_friendship
//   from : Principal;
// };

// public type AcceptFriendshipMessage = {
//   // accepted_friendship
//   from : Principal;
// };

export const InviteMatchCandid = IDL.Record({
  from: IDL.Principal,
});

export interface InviteMatch {
  from: Principal;
}

export const SendFriendshipCandid = IDL.Record({
  from: IDL.Principal,
});

export interface SendFriendship {
  from: Principal;
}

export const AcceptFriendshipCandid = IDL.Record({
  from: IDL.Principal,
});

export interface AcceptFriendship {
  from: Principal;
}
