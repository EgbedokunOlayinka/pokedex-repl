import {State} from '../state.js';

export async function commandExplore({pokeApi}: State, locationName: string) {
  try {
    if (!locationName) {
      console.log('Please provide a location');
      return;
    }
    console.log(`Exploring ${locationName}...`);
    const location = await pokeApi.fetchLocation(locationName);
    console.log('Found Pokemon:');
    location?.pokemon_encounters?.forEach(({pokemon: {name}}) => {
      console.log(`- ${name}`);
    });
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
  }
}
