import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface EditUser {
  'country' : [] | [string],
  'username' : [] | [string],
  'fullname' : [] | [string],
  'photo' : [] | [{ 'data' : Uint8Array | number[], 'extension' : string }],
}
export interface File {
  'data' : Uint8Array | number[],
  'hash' : Uint8Array | number[],
  'filename' : string,
}
export interface Match {
  'id' : bigint,
  'fen' : string,
  'moves' : Array<Move>,
  'time' : bigint,
  'winner' : string,
  'is_ranked' : boolean,
  'black_player' : Principal,
  'white_player' : Principal,
  'last_move' : bigint,
  'is_white_turn' : boolean,
}
export type MatchCreated = { 'match' : Match } |
  { 'text' : string };
export interface MatchResult {
  'id' : bigint,
  'moves' : Array<Move>,
  'time' : bigint,
  'winner' : string,
  'is_ranked' : boolean,
  'black_player' : User,
  'white_player' : User,
}
export interface MatchResultHistory {
  'id' : bigint,
  'moves' : Array<Move>,
  'time' : bigint,
  'winner' : string,
  'is_ranked' : boolean,
  'black_player' : Principal,
  'white_player' : Principal,
}
export interface Move { 'fen' : string, 'time' : bigint }
export type Result = { 'ok' : boolean } |
  { 'err' : string };
export type Result_1 = { 'ok' : Match } |
  { 'err' : string };
export type Result_2 = { 'ok' : MatchCreated } |
  { 'err' : string };
export type Result_3 = { 'ok' : User } |
  { 'err' : string };
export type Result_4 = { 'ok' : Principal } |
  { 'err' : string };
export type Result_5 = { 'ok' : MatchResult } |
  { 'err' : string };
export type Result_6 = { 'ok' : Array<MatchResultHistory> } |
  { 'err' : string };
export type Result_7 = { 'ok' : Array<User> } |
  { 'err' : string };
export type Result_8 = { 'ok' : File } |
  { 'err' : string };
export type Result_9 = { 'ok' : MatchResultHistory } |
  { 'err' : string };
export interface User {
  'id' : string,
  'win' : number,
  'country' : [] | [string],
  'username' : [] | [string],
  'draw' : number,
  'lost' : number,
  'fullname' : string,
  'score' : number,
  'photo' : [] | [Uint8Array | number[]],
  'is_banned' : boolean,
}
export interface WebsocketMessageQueue {
  'method' : string,
  'principal' : Principal,
  'body' : Uint8Array | number[],
}
export interface _SERVICE {
  'accept_friendship' : ActorMethod<[Principal], Result>,
  'accept_match' : ActorMethod<[Principal], Result_1>,
  'cancel_match_room' : ActorMethod<[], undefined>,
  'change_initial_fen' : ActorMethod<[string], undefined>,
  'edit_user' : ActorMethod<[EditUser], Result>,
  'get_active_match' : ActorMethod<[Principal], Result_9>,
  'get_file' : ActorMethod<[string], Result_8>,
  'get_friends' : ActorMethod<[Principal, boolean], Result_7>,
  'get_histories' : ActorMethod<[Principal, bigint, bigint], Result_6>,
  'get_match' : ActorMethod<[bigint], Result_5>,
  'get_principal_from_username' : ActorMethod<[string], Result_4>,
  'get_user' : ActorMethod<[Principal], Result_3>,
  'initialize' : ActorMethod<[Principal, Principal], undefined>,
  'invite_match' : ActorMethod<[Principal], Result>,
  'make_match' : ActorMethod<[boolean], Result_2>,
  'make_move' : ActorMethod<[bigint, string, string, [] | [string]], Result_1>,
  'pop_messages' : ActorMethod<[], Array<WebsocketMessageQueue>>,
  'register' : ActorMethod<[], undefined>,
  'reject_friendship' : ActorMethod<[Principal], Result>,
  'resign' : ActorMethod<[], Result>,
  'send_friendship' : ActorMethod<[Principal], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
