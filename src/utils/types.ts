export type Player = {
  id: string | number;
  username: string;
  rankScore: number;
  country: string;
};

export type GameHistory = {
  id: number;
  date: string;
  players: Player[];
  result: number;
  moves: number;
  status: string;
};
