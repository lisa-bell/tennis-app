import rl from "readline";
import { queryCommands } from "../types";

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function getQueryParameters(input: string): queryCommands {
  const commands = input.split(" ");
  const queryInstruction = !commands[1]
    ? commands[0]
    : `${commands[0]} ${commands[1]}`;
  const queryIdOrName = !commands[3]
    ? commands[2]
    : `${commands[2]} ${commands[3]}`;
  return { queryInstruction, queryIdOrName };
}
function prompt(): Promise<string> {
  return new Promise((resolve) => {
    readline.question("> ", (input) => resolve(input));
  });
}

export async function getCommands(commands?: string) {
  let inputCommands;
  if (commands) {
    inputCommands = commands;
  } else {
    inputCommands = await prompt();
  }
  return getQueryParameters(inputCommands);
}
