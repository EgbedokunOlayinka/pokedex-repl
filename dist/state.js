import { createInterface } from 'readline';
import { commandExit } from './commands/command_exit.js';
import { commandHelp } from './commands/command_help.js';
import { PokeAPI } from './pokeapi.js';
import { commandMap } from './commands/command_map.js';
import { commandMapb } from './commands/command_mapb.js';
import { Cache } from './pokecache.js';
export function getCommands() {
    return {
        exit: {
            name: 'exit',
            description: 'Exits the pokedex',
            callback: commandExit,
        },
        help: {
            name: 'help',
            description: 'Displays a help message',
            callback: commandHelp,
        },
        map: {
            name: 'map',
            description: 'Displays pokedex location areas, 20 at a time',
            callback: commandMap,
        },
        mapb: {
            name: 'mapb',
            description: 'Displays the previous page in the pokedex location areas list',
            callback: commandMapb,
        },
    };
}
export function initState() {
    const cacheInstance = new Cache(1000 * 60 * 5);
    return {
        commands: getCommands(),
        rl: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'Pokedex > ',
        }),
        pokeApi: new PokeAPI(cacheInstance),
    };
}
