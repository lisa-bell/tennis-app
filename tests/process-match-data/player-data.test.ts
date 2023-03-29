import { PlayerData } from "../../src/process-match-data/player-data";
import { setExpectedPlayerData } from "../setup-player-data";

describe("Player Data Class", () => {
  const mockScoredPoint = jest.spyOn(PlayerData.prototype, "scoredPoint");
  const mockCompleteWinningRound = jest.spyOn(
    PlayerData.prototype,
    "completeWinningRound"
  );
  const expectedPlayerData = {
    playerA: {
      advantage: false,
      currentScore: 0,
      gamesWon: 0,
      name: "Player A",
      setsWon: 0,
      totalGamesWon: 0,
    },
    playerB: {
      advantage: false,
      currentScore: 0,
      gamesWon: 0,
      name: "Player B",
      setsWon: 0,
      totalGamesWon: 0,
    },
  };
  const playersInitialValues = {
    playerA: { ...expectedPlayerData.playerA },
    playerB: { ...expectedPlayerData.playerB },
  };

  afterEach(function () {
    jest.clearAllMocks();
    expectedPlayerData.playerA = { ...playersInitialValues.playerA };
    expectedPlayerData.playerB = { ...playersInitialValues.playerB };
  });

  it("should create a new player 'Player A'", async () => {
    const playerA = new PlayerData(expectedPlayerData.playerA.name);
    expect(playerA).toBeInstanceOf(PlayerData);
    expect(playerA).toEqual(expectedPlayerData.playerA);
    expect(mockScoredPoint).not.toHaveBeenCalled();
    expect(mockCompleteWinningRound).not.toHaveBeenCalled();
  });

  it("should record when Player A scores against Player B", async () => {
    const playerA = new PlayerData(expectedPlayerData.playerA.name);
    const playerB = new PlayerData(expectedPlayerData.playerB.name);
    expect(playerA).toEqual(expectedPlayerData.playerA);
    expect(playerB).toEqual(expectedPlayerData.playerB);
    playerA.scoredPoint(playerB);
    expect(mockScoredPoint).toHaveBeenCalledWith(playerB);
    expect(mockCompleteWinningRound).not.toHaveBeenCalled();
    setExpectedPlayerData(expectedPlayerData.playerA, { currentScore: 15 });
    expect(playerA).toEqual(expectedPlayerData.playerA);
    expect(playerB).toEqual(expectedPlayerData.playerB);
  });

  it("should record when Player A and Player B have both won a point", async () => {
    const playerA = new PlayerData(expectedPlayerData.playerA.name);
    const mockScoredPointA = jest.spyOn(playerA, "scoredPoint");
    const playerB = new PlayerData(expectedPlayerData.playerB.name);
    const mockScoredPointB = jest.spyOn(playerB, "scoredPoint");
    expect(playerA).toEqual(expectedPlayerData.playerA);
    expect(playerB).toEqual(expectedPlayerData.playerB);
    playerA.scoredPoint(playerB);
    playerB.scoredPoint(playerA);
    expect(mockScoredPointA).toHaveBeenCalledWith(playerB);
    expect(mockScoredPointB).toHaveBeenCalledWith(playerA);
    expect(mockCompleteWinningRound).not.toHaveBeenCalled();
    setExpectedPlayerData(expectedPlayerData.playerA, { currentScore: 15 });
    setExpectedPlayerData(expectedPlayerData.playerB, { currentScore: 15 });
    expect(playerA).toEqual(expectedPlayerData.playerA);
    expect(playerB).toEqual(expectedPlayerData.playerB);
  });

  it("should record when Player A and Player B reach deuce", async () => {
    const playerA = new PlayerData(expectedPlayerData.playerA.name);
    const playerB = new PlayerData(expectedPlayerData.playerB.name);
    setExpectedPlayerData(expectedPlayerData.playerA, { currentScore: 40 });
    playerA.currentScore = 40;
    setExpectedPlayerData(expectedPlayerData.playerB, { currentScore: 30 });
    playerB.currentScore = 30;
    playerB.scoredPoint(playerA);
    expect(mockScoredPoint).toHaveBeenCalledWith(playerA);
    expect(mockCompleteWinningRound).not.toHaveBeenCalled();
    setExpectedPlayerData(expectedPlayerData.playerB, { currentScore: 40 });
    expect(playerA).toEqual(expectedPlayerData.playerA);
    expect(playerB).toEqual(expectedPlayerData.playerB);
  });

  it("should record when Player A wins a point (advantage) at deuce", async () => {
    const playerA = new PlayerData(expectedPlayerData.playerA.name);
    const playerB = new PlayerData(expectedPlayerData.playerB.name);
    setExpectedPlayerData(expectedPlayerData.playerA, { currentScore: 40 });
    playerA.currentScore = 40;
    setExpectedPlayerData(expectedPlayerData.playerB, { currentScore: 40 });
    playerB.currentScore = 40;
    playerA.scoredPoint(playerB);
    expect(mockScoredPoint).toHaveBeenCalledWith(playerB);
    expect(mockCompleteWinningRound).not.toHaveBeenCalled();
    setExpectedPlayerData(expectedPlayerData.playerA, { advantage: true });
    expect(playerA).toEqual(expectedPlayerData.playerA);
    expect(playerB).toEqual(expectedPlayerData.playerB);
  });

  it("should record when Player A wins a point back when Player B had advantage", async () => {
    const playerA = new PlayerData(expectedPlayerData.playerA.name);
    const playerB = new PlayerData(expectedPlayerData.playerB.name);
    setExpectedPlayerData(expectedPlayerData.playerA, { currentScore: 40 });
    playerA.currentScore = 40;
    setExpectedPlayerData(expectedPlayerData.playerB, { currentScore: 40 });
    playerB.currentScore = 40;
    playerB.advantage = true;
    playerA.scoredPoint(playerB);
    expect(mockScoredPoint).toHaveBeenCalledWith(playerB);
    expect(mockCompleteWinningRound).not.toHaveBeenCalled();
    setExpectedPlayerData(expectedPlayerData.playerB, { advantage: false });
    expect(playerA).toEqual(expectedPlayerData.playerA);
    expect(playerB).toEqual(expectedPlayerData.playerB);
  });

  it("should record when Player A wins game point from 40-30", async () => {
    const playerA = new PlayerData(expectedPlayerData.playerA.name);
    const playerB = new PlayerData(expectedPlayerData.playerB.name);
    setExpectedPlayerData(expectedPlayerData.playerA, { currentScore: 40 });
    playerA.currentScore = 40;
    setExpectedPlayerData(expectedPlayerData.playerA, { currentScore: 30 });
    playerB.currentScore = 30;
    playerA.scoredPoint(playerB);
    expect(mockScoredPoint).toHaveBeenCalledWith(playerB);
    expect(mockCompleteWinningRound).toHaveBeenCalled();
    setExpectedPlayerData(expectedPlayerData.playerA, {
      currentScore: 0,
      gamesWon: 1,
      totalGamesWon: 1,
    });
    setExpectedPlayerData(expectedPlayerData.playerB, { currentScore: 0 });
    expect(playerA).toEqual(expectedPlayerData.playerA);
    expect(playerB).toEqual(expectedPlayerData.playerB);
  });

  it("should record when Player B wins game from 'advantage'", async () => {
    const playerA = new PlayerData(expectedPlayerData.playerA.name);
    const playerB = new PlayerData(expectedPlayerData.playerB.name);
    setExpectedPlayerData(expectedPlayerData.playerA, { currentScore: 40 });
    playerA.currentScore = 40;
    setExpectedPlayerData(expectedPlayerData.playerB, { currentScore: 40 });
    playerB.currentScore = 40;
    playerB.advantage = true;
    playerB.scoredPoint(playerA);
    expect(mockScoredPoint).toHaveBeenCalledWith(playerA);
    expect(mockCompleteWinningRound).toHaveBeenCalledWith(playerA);
    setExpectedPlayerData(expectedPlayerData.playerA, { currentScore: 0 });
    setExpectedPlayerData(expectedPlayerData.playerB, {
      currentScore: 0,
      gamesWon: 1,
      totalGamesWon: 1,
      advantage: false,
    });
    expect(playerA).toEqual(expectedPlayerData.playerA);
    expect(playerB).toEqual(expectedPlayerData.playerB);
  });

  it("should record when Player B wins game without dropping a point", async () => {
    const playerA = new PlayerData(expectedPlayerData.playerA.name);
    const playerB = new PlayerData(expectedPlayerData.playerB.name);
    playerB.scoredPoint(playerA);
    playerB.scoredPoint(playerA);
    playerB.scoredPoint(playerA);
    playerB.scoredPoint(playerA);
    expect(mockCompleteWinningRound).toHaveBeenCalledWith(playerA);
    setExpectedPlayerData(expectedPlayerData.playerB, {
      currentScore: 0,
      gamesWon: 1,
      totalGamesWon: 1,
      advantage: false,
    });
    expect(playerA).toEqual(expectedPlayerData.playerA);
    expect(playerB).toEqual(expectedPlayerData.playerB);
  });

  it("should record when Player A wins set by getting to 6 games", async () => {
    const playerA = new PlayerData(expectedPlayerData.playerA.name);
    const playerB = new PlayerData(expectedPlayerData.playerB.name);
    setExpectedPlayerData(expectedPlayerData.playerA, {
      currentScore: 40,
      totalGamesWon: 5,
      gamesWon: 5,
    });
    playerA.currentScore = 40;
    playerA.totalGamesWon = 5;
    playerA.gamesWon = 5;
    playerA.scoredPoint(playerB);
    expect(mockCompleteWinningRound).toHaveBeenCalledWith(playerB);
    setExpectedPlayerData(expectedPlayerData.playerA, {
      currentScore: 0,
      gamesWon: 0,
      totalGamesWon: 6,
      setsWon: 1,
    });
    expect(playerA).toEqual(expectedPlayerData.playerA);
    expect(playerB).toEqual(expectedPlayerData.playerB);
  });
});
