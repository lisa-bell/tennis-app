import { Interface } from "readline";
import { PlayerDataForMatch, matchMapData } from "../types";
import openReadFileInterface from "../file-controls/read-file";
import { processLine } from "../process-match-data/process-data-for-match";

async function processFileLineByLine(
  readlineInterface: Interface
): Promise<matchMapData> {
  let matchData = new Map();
  let currentMatchId = "";
  let resultError;
  for await (const line of readlineInterface) {
    ({
      matchData: { fileData: matchData, error: resultError },
      currentMatchId,
    } = processLine(matchData, currentMatchId, line));
    if (resultError) {
      return { fileData: matchData, error: resultError };
    }
  }
  return {
    fileData: matchData,
    error: resultError ? resultError : undefined,
  };
}

async function getMatchDataFromFile(filename: string): Promise<matchMapData> {
  const readlineInterface = await openReadFileInterface(filename);

  const matchData: matchMapData = await processFileLineByLine(
    readlineInterface
  ).catch((err) => {
    return { fileData: matchData.fileData, error: err };
  });
  readlineInterface.close();
  readlineInterface.removeAllListeners();

  return matchData;
}
async function getMatchData(
  processArgs: string[]
): Promise<Map<string, PlayerDataForMatch> | void> {
  if (processArgs.length <= 2) {
    console.error("Expected at least one argument!");
    return undefined;
  }
  const matchData = await getMatchDataFromFile(processArgs[2]).catch((err) => {
    console.error(`Error: Unable to read data from file: '${err.path}'`);
    return undefined;
  });
  if (matchData?.error) {
    console.error(matchData.error);
    return undefined;
  }
  return matchData?.fileData;
}
export default getMatchData;
