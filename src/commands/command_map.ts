import {State} from '../state.js';

export async function commandMap(state: State) {
  try {
    const locations = await state.pokeApi.fetchLocations(
      state.nextLocationsURL,
    );

    state.nextLocationsURL = locations?.next;
    state.prevLocationsURL = locations?.previous;

    locations?.results.forEach(location => {
      console.log(location.name);
    });
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
  }
}
