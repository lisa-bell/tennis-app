import { matchMapDataInProgress, PlayerDataForMatch } from "../types";
import { PlayerData } from "./player-data";
import { processGameData } from "./process-data-for-game";

export function updateMatchId(
  matchData: Map<string, PlayerDataForMatch>,
  newMatchId: string
): matchMapDataInProgress {
  return {
    matchData: {
      fileData: matchData,
      error: matchData.get(newMatchId)
        ? `Error: matchId '${newMatchId}' already exists in match data`
        : undefined,
    },
    currentMatchId: newMatchId,
  };
}

export function updateMatchPlayerData(
  matchData: Map<string, PlayerDataForMatch>,
  currentMatchId: string,
  playerData: string[]
): matchMapDataInProgress {
  return {
    matchData: {
      fileData: matchData.set(currentMatchId, {
        player1: new PlayerData(`${playerData[0]} ${playerData[1]}`),
        player2: new PlayerData(`${playerData[3]} ${playerData[4]}`),
      }),
    },
    currentMatchId: currentMatchId,
  };
}

function determineInputType(input: string[]): string {
  return input[2] && input[2] === "vs"
    ? input[2].toLowerCase()
    : input[0].toLowerCase();
}

export function processLine(
  matchData: Map<string, PlayerDataForMatch>,
  currentMatchId: string,
  line: string
): matchMapDataInProgress {
  const currentLineData = line.split(" ");
  const inputToQueryOn = determineInputType(currentLineData);

  try {
    switch (inputToQueryOn) {
      case "match:":
        return updateMatchId(matchData, currentLineData[1]);
      case "vs":
        return updateMatchPlayerData(
          matchData,
          currentMatchId,
          currentLineData
        );
      default:
        processGameData(matchData, currentMatchId, currentLineData[0]);
        return { matchData: { fileData: matchData }, currentMatchId };
    }
  } catch (error) {
    return {
      matchData: { fileData: matchData, error: `${error}` },
      currentMatchId,
    };
  }
}
