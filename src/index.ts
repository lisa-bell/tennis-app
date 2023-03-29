#!/usr/bin/env node

import getMatchData from "./read-match-data/get-match-data";
import { queryMatchData } from "./query-match-data/query-match-data";

async function runApp() {
  const matchData = await getMatchData(process.argv);
  if (!matchData) {
    process.exit(1);
  }
  console.log("Match data read and ready for querying:");
  let quit = false;
  while (!quit) {
    const response = await queryMatchData(matchData);
    if (response === "quit") {
      quit = true;
      continue;
    }
    console.log(`${response}`);
  }
  process.exit();
}

runApp();

module.exports = runApp;
