import { PlayerDataForMatch, queryCommands } from "../types";

function scoreMatch(
  matchData: Map<string, PlayerDataForMatch>,
  queryId: string
): string {
  const match = matchData.get(queryId);
  if (!match) {
    return "Match data does not exist";
  }
  let winner;
  let loser;
  if (match.player1.setsWon > match.player2.setsWon) {
    winner = match.player1;
    loser = match.player2;
  } else {
    winner = match.player2;
    loser = match.player1;
  }
  return `${winner.name} defeated ${loser.name}\n${winner.setsWon} sets to ${loser.setsWon}`;
}

function gamesPlayer(
  matchData: Map<string, PlayerDataForMatch>,
  queryName: string
): string {
  let gamesWon = 0;
  let gamesLost = 0;
  for (const value of matchData.values()) {
    if (value.player1.name === queryName || value.player2.name === queryName) {
      gamesWon +=
        value.player1.name === queryName
          ? value.player1.totalGamesWon
          : value.player2.totalGamesWon;
      gamesLost +=
        value.player1.name !== queryName
          ? value.player1.totalGamesWon
          : value.player2.totalGamesWon;
    }
  }
  return `${gamesWon} ${gamesLost}`;
}

export function performCommand(
  matchData: Map<string, PlayerDataForMatch>,
  inputCommand: queryCommands
) {
  const validCommands = {
    scoreMatch: "score match",
    gamesPlayer: "games player",
    quit: "quit",
  };
  let outputStr;
  switch (inputCommand.queryInstruction.toLowerCase()) {
    case validCommands.scoreMatch:
      outputStr = scoreMatch(matchData, inputCommand.queryIdOrName);
      break;
    case validCommands.gamesPlayer:
      outputStr = gamesPlayer(matchData, inputCommand.queryIdOrName);
      break;
    case validCommands.quit:
      outputStr = validCommands.quit;
      break;
    default:
      outputStr = "Sorry, that is an invalid command";
  }
  return outputStr;
}
