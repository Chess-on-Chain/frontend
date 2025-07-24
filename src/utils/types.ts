export type Player = {
  id: string | number;
  username: string;
  rankScore: number | string;
  country: string;
};

export type GameHistory = {
  id: string;
  date: string;
  players: Player[];
  result: string;
  moves: number;
};
