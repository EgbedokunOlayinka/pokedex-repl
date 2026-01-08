import {createInterface} from 'node:readline';
import {startREPL} from '../repl.js';
import {getCommands, State} from '../state.js';

export async function commandMap({pokeApi, nextLocationsURL, rl}: State) {
  try {
    const locations = await pokeApi.fetchLocations(nextLocationsURL);
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
