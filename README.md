
### Design of solution

I have broken the solution into 2 overall parts:
- reading the tournament data from the file specified at the command line and producing a Map() object to contain the resultant match data
- taking queries from a command line prompt to calculate stats from the match data

It was decided to make the match data Map(), `matchMap()`, mirror the file data by using the `matchId` as the key value for the Map and the player data for both players, including scores, held as the value. As such, the code tests to ensure that `matchId` remains unique. 

Player names are not required to be unique. Rather the assumption has been made that multiple occurences of the same player name are referring to the same player. However, due to time constraints, the code currently does not prevent players in a match from having the same name. Under the assumption being made, this would effectively be listing a player as playing themselves in a match and is therefore nonsensical. It would make sense to prevent this.

An attempt to introduce some flexibility in the code has been made by adding the following:
- making all input data or query commands lower case
- blank lines in the `full_tournament.txt` file (or any other used) are ignored without causing an issue
- checking input data on the `"vs"` of `"Person A vs Person B"` so that variety on input player names is allowed

Error checking (ie incorrect input data or query commands) has been added. However, there is currently no 'context' checking of the input file data to ensure that the flow of information is correct for the setting. That is, no checking is done to ensure that `"Match: {id}"` occurs first in the file, followed by `"Player A vs Player B"`, followed by score data, and that the score data makes sense in adding up to a full game/set/match scenario. This was deemed to be outside the scope of a 'simple' app scenario but would absolutely be crucial for a real-world context.

### Technical considerations

TennisApp is a Node app built with Typescript. The following directories are found under the `rootDir`:
- `src`: all source code
- `build`: compiled .js code. This is updated every build
- `node_modules`: built from installation guided by package.json
- `tests`: all test code


1. Run `npm install` to install the required packages.
2. Run `npm start {filename}` to run the application from the command line.
- The application will take the match data from the `{filename}` file as specified
- Before running the application, it will be 'linted' and built
- Once the match data has been read in, the user will see a '>' prompt. Query commands are to be input from the command line here, one at a time. Results for each query will display immediately under query input.
- The query command input, as implemented, is a minor variation to the challenge specification
3. Run `npm test` to execute the test suite. The test suite covers all examples given in the problem statement with the inclusion of some error handling tests.


### Testing

There are a number of tests available in the `tests` directory but they do not provide full coverage of the codebase. Due to time constraints a decision was made to cover what was deemed to be the critical path elements of the codebase. I believe these are sufficient to demonstrate understanding of what is required in testing but also believe that all elements of a codebase should have full testing for a real world example.