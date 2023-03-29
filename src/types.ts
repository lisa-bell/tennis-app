import { PlayerData } from "./process-match-data/player-data";

export type PlayerDataForMatch = {
  player1: PlayerData;
  player2: PlayerData;
};

export type matchMapData = {
  fileData: Map<string, PlayerDataForMatch>;
  error?: string;
};

export type matchMapDataInProgress = {
  matchData: matchMapData;
  currentMatchId: string;
};

export type queryCommands = {
  queryInstruction: string;
  queryIdOrName: string;
};
