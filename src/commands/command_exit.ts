import {State} from '../state.js';

export async function commandExit({rl}: State) {
  console.log('Closing the Pokedex... Goodbye!');
  rl.close();
  process.exit(0);
}
