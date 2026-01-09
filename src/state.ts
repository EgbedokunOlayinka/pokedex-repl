import {type Interface, createInterface} from 'readline';
import {commandExit} from './commands/command_exit.js';
import {commandHelp} from './commands/command_help.js';
import {PokeAPI, PokemonInfo} from './pokeapi.js';
import {commandMap} from './commands/command_map.js';
import {commandMapb} from './commands/command_mapb.js';
import {Cache} from './pokecache.js';
import {commandExplore} from './commands/command_explore.js';
import {commandCatch} from './commands/command_catch.js';

export type State = {
  commands: Record<string, CLICommand>;
  rl: Interface;
  pokeApi: PokeAPI;
  nextLocationsURL?: string;
  prevLocationsURL?: string;
  pokedex: Record<string, PokemonInfo>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function getCommands(): Record<string, CLICommand> {
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
      description:
        'Displays the previous page in the pokedex location areas list',
      callback: commandMapb,
    },
    explore: {
      name: 'explore',
      description: 'Find pokemons in a specific location area',
      callback: commandExplore,
    },
    catch: {
      name: 'catch',
      description: 'Catch a pokemon!',
      callback: commandCatch,
    },
  };
}

export function initState(): State {
  const cacheInstance = new Cache(1000 * 60 * 5);
  return {
    commands: getCommands(),
    rl: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'Pokedex > ',
    }),
    pokeApi: new PokeAPI(cacheInstance),
    pokedex: {},
  };
}
