import {State} from '../state.js';

export async function commandPokedex(state: State) {
  const list = Object.keys(state.pokedex);
  if (!list.length) {
    console.log(
      'Your pokedex is empty! Try to catch some pokemons and check back.',
    );
    return;
  }
  console.log('Your Pokedex:');
  list.forEach(pokemon => {
    console.log(` - ${pokemon}`);
  });
}
