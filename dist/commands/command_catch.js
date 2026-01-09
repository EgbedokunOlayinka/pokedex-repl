import { startREPL } from '../repl.js';
import { getCommands } from '../state.js';
import { createInterface } from 'node:readline';
const DIFFICULTY = 0.03;
export async function commandCatch({ pokeApi, rl, nextLocationsURL, prevLocationsURL, pokedex }, pokemonName) {
    try {
        if (!pokemonName) {
            console.log('Please provide a pokemon name');
            return;
        }
        console.log(`Throwing a Pokeball at ${pokemonName}...`);
        const pokemon = await pokeApi.fetchPokemonInfo(pokemonName);
        if (pokemon) {
            const chance = Math.exp(-DIFFICULTY * pokemon.base_experience);
            const roll = Math.random();
            const pokemonCaught = roll < chance;
            console.log(pokemonCaught
                ? `${pokemonName} was caught!`
                : `${pokemonName} escaped!`);
            if (!pokemonCaught || pokedex[pokemonName])
                return;
            rl.close();
            startREPL({
                commands: getCommands(),
                rl: createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    prompt: 'Pokedex > ',
                }),
                pokeApi,
                nextLocationsURL,
                prevLocationsURL,
                pokedex: {
                    ...pokedex,
                    [pokemonName]: pokemon,
                },
            });
        }
    }
    catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
}
