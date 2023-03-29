import { PlayerData } from "../src/process-match-data/player-data";
import { MatchType, PlayerType } from "./types";
import { PlayerDataForMatch } from "../src/types";

export const expectedPlayerData = [
  {
    matchId: "01",
    player1: {
      advantage: false,
      currentScore: 0,
      gamesWon: 5,
      name: "Player A",
      setsWon: 1,
      totalGamesWon: 5,
    },
    player2: {
      advantage: false,
      currentScore: 0,
      gamesWon: 0,
      name: "Player B",
      setsWon: 0,
      totalGamesWon: 0,
    },
  },
  {
    matchId: "02",
    player1: {
      advantage: false,
      currentScore: 0,
      gamesWon: 0,
      name: "Player A",
      setsWon: 0,
      totalGamesWon: 0,
    },
    player2: {
      advantage: false,
      currentScore: 0,
      gamesWon: 0,
      name: "Player C",
      setsWon: 0,
      totalGamesWon: 0,
    },
  },
];
export const expectedPlayerDataForFullMatch = [
  {
    matchId: "01",
    player1: {
      advantage: false,
      currentScore: 0,
      gamesWon: 0,
      name: "Player A",
      setsWon: 2,
      totalGamesWon: 12,
    },
    player2: {
      advantage: false,
      currentScore: 0,
      gamesWon: 0,
      name: "Player B",
      setsWon: 0,
      totalGamesWon: 0,
    },
  },
  {
    matchId: "02",
    player1: {
      advantage: false,
      currentScore: 0,
      gamesWon: 0,
      name: "Player A",
      setsWon: 1,
      totalGamesWon: 11,
    },
    player2: {
      advantage: false,
      currentScore: 0,
      gamesWon: 0,
      name: "Player C",
      setsWon: 2,
      totalGamesWon: 17,
    },
  },
];

export function setExpectedPlayerData(
  existingPlayer: PlayerType,
  updatedPlayerInformation: PlayerType
) {
  return Object.assign(existingPlayer, updatedPlayerInformation);
}

export function initialiseFullMatchMap(): Map<string, PlayerDataForMatch> {
  const matchMap = new Map();
  for (const players of expectedPlayerDataForFullMatch) {
    matchMap.set(players.matchId, {
      player1: new PlayerData(players.player1.name),
      player2: new PlayerData(players.player2.name),
    });
    const player1 = matchMap.get(players.matchId).player1;
    setExpectedPlayerData(player1, players.player1);
    const player2 = matchMap.get(players.matchId).player2;
    setExpectedPlayerData(player2, players.player2);
  }
  return matchMap;
}

export function initialiseMatchMap(
  playerData: MatchType
): Map<string, PlayerDataForMatch> {
  const matchMap = new Map();
  matchMap.set(playerData.matchId, {
    player1: new PlayerData(playerData.player1.name),
    player2: new PlayerData(playerData.player2.name),
  });
  const player1 = matchMap.get(playerData.matchId).player1;
  player1.setsWon = playerData.player1.setsWon;
  player1.gamesWon = playerData.player1.gamesWon;
  player1.totalGamesWon = playerData.player1.totalGamesWon;
  return matchMap;
}
