import { PlayerDataForMatch } from "../types";

function thisPlayerWonPoint(playerScore: string, validScore: string): boolean {
  return playerScore === validScore;
}
export function processGameData(
  matchData: Map<string, PlayerDataForMatch>,
  currentMatchId: string,
  score: string
) {
  const validLineEntries = {
    firstPlayerScored: "0",
    secondPlayerScored: "1",
    blankLine: "",
  };
  const players = matchData.get(currentMatchId);
  if (!players) {
    throw `Error: player data does not exist for current match ${currentMatchId}`;
  }
  if (thisPlayerWonPoint(score, validLineEntries.firstPlayerScored)) {
    players.player1.scoredPoint(players.player2);
    return;
  }
  if (thisPlayerWonPoint(score, validLineEntries.secondPlayerScored)) {
    players.player2.scoredPoint(players.player1);
    return;
  }
  if (score !== validLineEntries.blankLine) {
    throw `Error: Unknown score value '${score}' in file data`;
  }
}
