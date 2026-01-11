export async function commandMapb(state) {
    try {
        if (!state.prevLocationsURL) {
            console.log("you're on the first page");
            return;
        }
        const locations = await state.pokeApi.fetchLocations(state.prevLocationsURL);
        state.nextLocationsURL = locations?.next;
        state.prevLocationsURL = locations?.previous;
        locations?.results.forEach(location => {
            console.log(location.name);
        });
    }
    catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
}
