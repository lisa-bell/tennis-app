export class PlayerData {
  name: string;
  setsWon: number;
  gamesWon: number;
  totalGamesWon: number;
  currentScore: number;
  advantage: boolean;
  constructor(name: string) {
    this.name = name;
    this.setsWon = 0;
    this.gamesWon = 0;
    this.totalGamesWon = 0;
    this.currentScore = 0;
    this.advantage = false;
  }

  completeWinningRound(loser: PlayerData) {
    const GAMES_TO_WIN_SET = 6;
    this.currentScore = 0;
    loser.currentScore = 0;
    this.advantage = false;
    loser.advantage = false;
    this.gamesWon++;
    this.totalGamesWon++;
    if (this.gamesWon === GAMES_TO_WIN_SET) {
      this.setsWon++;
      this.gamesWon = 0;
      loser.gamesWon = 0;
    }
  }

  scoredPoint(loser: PlayerData) {
    const POINTS_TO_WIN_GAME = 40;
    const deuce =
      this.currentScore === POINTS_TO_WIN_GAME &&
      loser.currentScore === POINTS_TO_WIN_GAME;
    if (deuce && this.advantage) {
      this.completeWinningRound(loser);
      return;
    }
    if (deuce && loser.advantage) {
      loser.advantage = false;
      return;
    }
    if (deuce) {
      this.advantage = true;
      return;
    }
    if (this.currentScore === POINTS_TO_WIN_GAME) {
      this.completeWinningRound(loser);
      return;
    }
    if (this.currentScore === 30) {
      this.currentScore = POINTS_TO_WIN_GAME;
    } else {
      this.currentScore += 15;
    }
  }
}
