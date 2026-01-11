export async function commandExplore(state, locationName) {
    try {
        if (!locationName) {
            console.log('Please provide a location');
            return;
        }
        console.log(`Exploring ${locationName}...`);
        const location = await state.pokeApi.fetchLocation(locationName);
        console.log('Found Pokemon:');
        location?.pokemon_encounters?.forEach(({ pokemon: { name } }) => {
            console.log(`- ${name}`);
        });
    }
    catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
}
