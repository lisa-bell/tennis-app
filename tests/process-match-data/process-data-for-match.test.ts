import {
  processLine,
  updateMatchId,
  updateMatchPlayerData,
} from "../../src/process-match-data/process-data-for-match";
import { processGameData } from "../../src/process-match-data/process-data-for-game";
import { PlayerDataForMatch, matchMapDataInProgress } from "../../src/types";
import { PlayerData } from "../../src/process-match-data/player-data";
import { expectedPlayerData, initialiseMatchMap } from "../setup-player-data";

jest.mock("../../src/process-match-data/process-data-for-game", () => {
  return {
    processGameData: jest.fn(),
  };
});

describe("Process Data for Match: processLine", () => {
  let mockedProcessGameData: jest.Mock;
  let matchMap: Map<string, PlayerDataForMatch>;

  const matchId = expectedPlayerData[0].matchId;
  let matchMapInProgress: matchMapDataInProgress;
  beforeEach(function () {
    matchMap = initialiseMatchMap(expectedPlayerData[0]);
    matchMapInProgress = {
      matchData: {
        fileData: matchMap,
      },
      currentMatchId: matchId,
    };
    mockedProcessGameData = processGameData as jest.Mock;
  });

  afterEach(function () {
    jest.clearAllMocks();
  });

  it("should correctly identified new matchId", async () => {
    const result = processLine(matchMap, "01", "Match: 02");
    matchMapInProgress.currentMatchId = "02";
    expect(result).toEqual(matchMapInProgress);
  });

  it("should reject a new matchId that already exists in match data", async () => {
    const result = processLine(matchMap, "01", "Match: 01");
    matchMapInProgress.matchData.error =
      "Error: matchId '01' already exists in match data";
    expect(result).toEqual(matchMapInProgress);
  });

  it("should update match data with matchId and player data", async () => {
    const result = processLine(matchMap, "02", "Person A vs Person C");
    matchMapInProgress.currentMatchId = "02";
    matchMap.set(expectedPlayerData[1].matchId, {
      player1: new PlayerData(expectedPlayerData[1].player1.name),
      player2: new PlayerData(expectedPlayerData[1].player2.name),
    });
    expect(result).toEqual(matchMapInProgress);
  });

  it("should catch a thrown error from processGameData", async () => {
    mockedProcessGameData.mockImplementation(() => {
      throw "Error: processGameData threw error";
    });
    matchMapInProgress.matchData.error = "Error: processGameData threw error";
    const result = processLine(matchMap, "01", "0");
    expect(result).toEqual(matchMapInProgress);
  });
});

describe("Process Data for Match: updateMatchId", () => {
  let matchMap: Map<string, PlayerDataForMatch>;

  const matchId = expectedPlayerData[0].matchId;
  let matchMapInProgress: matchMapDataInProgress;
  beforeEach(function () {
    matchMap = initialiseMatchMap(expectedPlayerData[0]);
    matchMapInProgress = {
      matchData: {
        fileData: matchMap,
      },
      currentMatchId: matchId,
    };
  });

  it("should correctly update new matchId", async () => {
    const result = updateMatchId(matchMap, "02");
    matchMapInProgress.currentMatchId = "02";
    expect(result).toEqual(matchMapInProgress);
  });

  it("should reject a new matchId that already exists in match data", async () => {
    const result = updateMatchId(matchMap, "01");
    matchMapInProgress.matchData.error =
      "Error: matchId '01' already exists in match data";
    expect(result).toEqual(matchMapInProgress);
  });
});

describe("Process Data for Match: updateMatchPlayerData", () => {
  let matchMap: Map<string, PlayerDataForMatch>;

  const matchId = expectedPlayerData[0].matchId;
  let matchMapInProgress: matchMapDataInProgress;
  beforeEach(function () {
    matchMap = initialiseMatchMap(expectedPlayerData[0]);
    matchMapInProgress = {
      matchData: {
        fileData: matchMap,
      },
      currentMatchId: matchId,
    };
  });

  it("should correctly update matchMap with new player data", async () => {
    const result = updateMatchPlayerData(matchMap, "02", [
      "Player",
      "A",
      "vs",
      "Player",
      "C",
    ]);
    matchMapInProgress.currentMatchId = "02";
    matchMap.set(expectedPlayerData[1].matchId, {
      player1: new PlayerData(expectedPlayerData[1].player1.name),
      player2: new PlayerData(expectedPlayerData[1].player2.name),
    });
    expect(result).toEqual(matchMapInProgress);
  });
});
