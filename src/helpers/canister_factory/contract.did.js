export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text });
  const Move = IDL.Record({ 'fen' : IDL.Text, 'time' : IDL.Nat64 });
  const Match = IDL.Record({
    'id' : IDL.Nat64,
    'fen' : IDL.Text,
    'moves' : IDL.Vec(Move),
    'time' : IDL.Nat64,
    'winner' : IDL.Text,
    'is_ranked' : IDL.Bool,
    'black_player' : IDL.Principal,
    'white_player' : IDL.Principal,
    'last_move' : IDL.Nat64,
    'is_white_turn' : IDL.Bool,
  });
  const Result_1 = IDL.Variant({ 'ok' : Match, 'err' : IDL.Text });
  const EditUser = IDL.Record({
    'country' : IDL.Opt(IDL.Text),
    'username' : IDL.Opt(IDL.Text),
    'fullname' : IDL.Opt(IDL.Text),
    'photo' : IDL.Opt(
      IDL.Record({ 'data' : IDL.Vec(IDL.Nat8), 'extension' : IDL.Text })
    ),
  });
  const MatchResultHistory = IDL.Record({
    'id' : IDL.Nat64,
    'moves' : IDL.Vec(Move),
    'time' : IDL.Nat64,
    'winner' : IDL.Text,
    'is_ranked' : IDL.Bool,
    'black_player' : IDL.Principal,
    'white_player' : IDL.Principal,
  });
  const Result_9 = IDL.Variant({ 'ok' : MatchResultHistory, 'err' : IDL.Text });
  const File = IDL.Record({
    'data' : IDL.Vec(IDL.Nat8),
    'hash' : IDL.Vec(IDL.Nat8),
    'filename' : IDL.Text,
  });
  const Result_8 = IDL.Variant({ 'ok' : File, 'err' : IDL.Text });
  const User = IDL.Record({
    'id' : IDL.Text,
    'win' : IDL.Nat16,
    'country' : IDL.Opt(IDL.Text),
    'username' : IDL.Opt(IDL.Text),
    'draw' : IDL.Nat16,
    'lost' : IDL.Nat16,
    'fullname' : IDL.Text,
    'score' : IDL.Nat16,
    'photo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'is_banned' : IDL.Bool,
  });
  const Result_7 = IDL.Variant({ 'ok' : IDL.Vec(User), 'err' : IDL.Text });
  const Result_6 = IDL.Variant({
    'ok' : IDL.Vec(MatchResultHistory),
    'err' : IDL.Text,
  });
  const MatchResult = IDL.Record({
    'id' : IDL.Nat64,
    'moves' : IDL.Vec(Move),
    'time' : IDL.Nat64,
    'winner' : IDL.Text,
    'is_ranked' : IDL.Bool,
    'black_player' : User,
    'white_player' : User,
  });
  const Result_5 = IDL.Variant({ 'ok' : MatchResult, 'err' : IDL.Text });
  const Result_4 = IDL.Variant({ 'ok' : IDL.Principal, 'err' : IDL.Text });
  const Result_3 = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  const MatchCreated = IDL.Variant({ 'match' : Match, 'text' : IDL.Text });
  const Result_2 = IDL.Variant({ 'ok' : MatchCreated, 'err' : IDL.Text });
  const WebsocketMessageQueue = IDL.Record({
    'method' : IDL.Text,
    'principal' : IDL.Principal,
    'body' : IDL.Vec(IDL.Nat8),
  });
  return IDL.Service({
    'accept_friendship' : IDL.Func([IDL.Principal], [Result], []),
    'accept_match' : IDL.Func([IDL.Principal], [Result_1], []),
    'cancel_match_room' : IDL.Func([], [], []),
    'change_initial_fen' : IDL.Func([IDL.Text], [], ['oneway']),
    'edit_user' : IDL.Func([EditUser], [Result], []),
    'get_active_match' : IDL.Func([IDL.Principal], [Result_9], ['query']),
    'get_file' : IDL.Func([IDL.Text], [Result_8], ['query']),
    'get_friends' : IDL.Func([IDL.Principal, IDL.Bool], [Result_7], ['query']),
    'get_histories' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Nat],
        [Result_6],
        ['query'],
      ),
    'get_match' : IDL.Func([IDL.Nat64], [Result_5], ['query']),
    'get_principal_from_username' : IDL.Func([IDL.Text], [Result_4], ['query']),
    'get_user' : IDL.Func([IDL.Principal], [Result_3], ['query']),
    'initialize' : IDL.Func([IDL.Principal, IDL.Principal], [], ['oneway']),
    'invite_match' : IDL.Func([IDL.Principal], [Result], []),
    'make_match' : IDL.Func([IDL.Bool], [Result_2], []),
    'make_move' : IDL.Func(
        [IDL.Nat64, IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
        [Result_1],
        [],
      ),
    'pop_messages' : IDL.Func([], [IDL.Vec(WebsocketMessageQueue)], []),
    'register' : IDL.Func([], [], []),
    'reject_friendship' : IDL.Func([IDL.Principal], [Result], []),
    'resign' : IDL.Func([], [Result], []),
    'send_friendship' : IDL.Func([IDL.Principal], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
