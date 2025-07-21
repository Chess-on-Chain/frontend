export default ({ IDL }: { IDL: any }) => {
  const Match = IDL.Record({
    id: IDL.Text,
    fen: IDL.Text,
    moves: IDL.Vec(IDL.Nat16),
    timer: IDL.Opt(IDL.Nat64),
    winner: IDL.Text,
    black_player: IDL.Principal,
    white_player: IDL.Principal,
    is_white_turn: IDL.Bool,
  });
  const MatchResultHistory = IDL.Record({
    id: IDL.Text,
    fen: IDL.Text,
    moves: IDL.Vec(IDL.Nat16),
    winner: IDL.Text,
    black_player: IDL.Principal,
    white_player: IDL.Principal,
  });
  const User = IDL.Record({
    id: IDL.Principal,
    win: IDL.Nat16,
    draw: IDL.Nat16,
    lost: IDL.Nat16,
    is_banned: IDL.Bool,
  });
  const MatchResult = IDL.Record({
    id: IDL.Text,
    fen: IDL.Text,
    moves: IDL.Vec(IDL.Nat16),
    winner: IDL.Text,
    black_player: User,
    white_player: User,
  });
  const WebhookData = IDL.Record({
    winner: IDL.Text,
    black_player: IDL.Text,
    white_player: IDL.Text,
    winner_player: IDL.Text,
    match_id: IDL.Text,
    webhook_id: IDL.Text,
  });
  const HttpHeader = IDL.Record({ value: IDL.Text, name: IDL.Text });
  const HttpResponse = IDL.Record({
    status: IDL.Nat,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HttpHeader),
  });
  const HttpTransformArgs = IDL.Record({
    context: IDL.Vec(IDL.Nat8),
    response: HttpResponse,
  });
  return IDL.Service({
    accept_ownership: IDL.Func([], [], []),
    add_match: IDL.Func(
      [IDL.Principal, IDL.Principal],
      [IDL.Tuple(IDL.Text, Match)],
      []
    ),
    add_match_move: IDL.Func([IDL.Text, IDL.Nat16, IDL.Text], [Match], []),
    ban: IDL.Func([IDL.Principal], [], []),
    change_webhook_url: IDL.Func([IDL.Text], [], []),
    get_histories: IDL.Func(
      [IDL.Principal, IDL.Nat16, IDL.Nat16],
      [IDL.Vec(MatchResultHistory)],
      ["query"]
    ),
    get_match: IDL.Func([IDL.Text], [MatchResult], ["query"]),
    get_user: IDL.Func([IDL.Principal], [IDL.Opt(User)], ["query"]),
    get_webhook_data: IDL.Func([IDL.Text], [WebhookData], ["query"]),
    initialize: IDL.Func([IDL.Principal, IDL.Principal, IDL.Text], [], []),
    resign: IDL.Func([], [], []),
    transfer_ownership: IDL.Func([IDL.Principal], [], []),
    unban: IDL.Func([IDL.Principal], [], []),
    webhook_transform: IDL.Func([HttpTransformArgs], [HttpResponse], ["query"]),
  });
};
export const init = ({ IDL }: { IDL: any }) => {
  return [];
};
