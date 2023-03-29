export type PlayerType = {
  name?: string;
  advantage?: boolean;
  currentScore?: number;
  gamesWon?: number;
  setsWon?: number;
  totalGamesWon?: number;
};
export type PlayerSetupType = {
  name: string;
  advantage: boolean;
  currentScore: number;
  gamesWon: number;
  setsWon: number;
  totalGamesWon: number;
};

export type MatchType = {
  matchId: string;
  player1: PlayerSetupType;
  player2: PlayerSetupType;
};
