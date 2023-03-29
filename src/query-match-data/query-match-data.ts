import { PlayerDataForMatch } from "../types";
import { getCommands } from "../handle-cli/handle-input";
import { performCommand } from "./perform-query";

export async function queryMatchData(
  matchData: Map<string, PlayerDataForMatch>,
  commands?: string
) {
  const inputCommands = await getCommands(commands);
  return performCommand(matchData, inputCommands);
}
