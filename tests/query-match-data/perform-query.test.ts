import { performCommand } from "../../src/query-match-data/perform-query";
import { initialiseFullMatchMap } from "../setup-player-data";
import { PlayerDataForMatch } from "../../src/types";

describe("Perform Query", () => {
  let matchMap: Map<string, PlayerDataForMatch>;

  beforeEach(function () {
    matchMap = initialiseFullMatchMap();
  });

  it("should return 'quit' when command entered", async () => {
    const result = performCommand(matchMap, {
      queryInstruction: "quit",
      queryIdOrName: "",
    });
    expect(result).toEqual("quit");
  });

  it("should return error when incorrect query is entered", async () => {
    const result = performCommand(matchMap, {
      queryInstruction: "Manager",
      queryIdOrName: "",
    });
    expect(result).toEqual("Sorry, that is an invalid command");
  });

  it("should return error when incorrect query is entered", async () => {
    const result = performCommand(matchMap, {
      queryInstruction: "Manager",
      queryIdOrName: "",
    });
    expect(result).toEqual("Sorry, that is an invalid command");
  });

  it("should return a correct score for a valid matchId", async () => {
    const result = performCommand(matchMap, {
      queryInstruction: "Score Match",
      queryIdOrName: "02",
    });
    expect(result).toEqual(`Player C defeated Player A\n2 sets to 1`);
  });

  it("should return an error for an invalid matchId", async () => {
    const result = performCommand(matchMap, {
      queryInstruction: "Score Match",
      queryIdOrName: "04",
    });
    expect(result).toEqual("Match data does not exist");
  });

  it("should return the correct number of games won/lost for a valid player", async () => {
    const result = performCommand(matchMap, {
      queryInstruction: "Games Player",
      queryIdOrName: "Player A",
    });
    expect(result).toEqual("23 17");
  });

  it("should return the correct number of games won/lost (0) for an unknown player", async () => {
    const result = performCommand(matchMap, {
      queryInstruction: "Games Player",
      queryIdOrName: "Player X",
    });
    expect(result).toEqual("0 0");
  });
});
