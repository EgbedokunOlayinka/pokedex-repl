import {createInterface} from 'node:readline';
import {startREPL} from '../repl.js';
import {getCommands, State} from '../state.js';

export async function commandMapb({pokeApi, prevLocationsURL, rl}: State) {
  try {
    if (!prevLocationsURL) {
      console.log("you're on the first page");
      return;
    }
    const locations = await pokeApi.fetchLocations(prevLocationsURL);
    locations?.results.forEach(location => {
      console.log(location.name);
    });
    rl.close();
    startREPL({
      commands: getCommands(),
      rl: createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > ',
      }),
      pokeApi,
      nextLocationsURL: locations?.next,
      prevLocationsURL: locations?.previous,
    });
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
  }
}
