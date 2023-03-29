import { processGameData } from "../../src/process-match-data/process-data-for-game";
import { expectedPlayerData, initialiseMatchMap } from "../setup-player-data";
import { PlayerDataForMatch } from "../../src/types";
import { PlayerSetupType } from "../types";

describe("Process Data for Game", () => {
  let matchMap: Map<string, PlayerDataForMatch>;
  let player1ExpectedData: PlayerSetupType;
  let player2ExpectedData: PlayerSetupType;

  const matchId = expectedPlayerData[0].matchId;
  beforeEach(function () {
    matchMap = initialiseMatchMap(expectedPlayerData[0]);
  });

  afterEach(function () {
    player1ExpectedData = { ...expectedPlayerData[0].player1 };
    player2ExpectedData = { ...expectedPlayerData[0].player2 };
  });

  it("should throw an error when an incorrect matchId is specified", async () => {
    try {
      processGameData(matchMap, "03", "0");
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe(
        "Error: player data does not exist for current match 03"
      );
    }
  });

  it("should throw an error when an unknown value exists for game score", async () => {
    try {
      processGameData(matchMap, "01", "X");
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("Error: Unknown score value 'X' in file data");
    }
  });

  it("should correctly update score for player 1", async () => {
    processGameData(matchMap, "01", "0");
    player1ExpectedData.currentScore = 15;
    const players = matchMap.get(matchId);
    expect(players?.player1).toEqual(player1ExpectedData);
    expect(players?.player2).toEqual(player2ExpectedData);
  });

  it("should correctly update score for player 2", async () => {
    processGameData(matchMap, "01", "1");
    player2ExpectedData.currentScore = 15;
    const players = matchMap.get(matchId);
    expect(players?.player1).toEqual(player1ExpectedData);
    expect(players?.player2).toEqual(player2ExpectedData);
  });
});
