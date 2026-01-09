import { createInterface } from 'node:readline';
import { startREPL } from '../repl.js';
import { getCommands } from '../state.js';
export async function commandMap({ pokeApi, nextLocationsURL, rl, pokedex, }) {
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
            pokedex,
            nextLocationsURL: locations?.next,
            prevLocationsURL: locations?.previous,
        });
    }
    catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
}
