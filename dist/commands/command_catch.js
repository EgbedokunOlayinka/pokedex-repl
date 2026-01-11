const DIFFICULTY = 0.03;
export async function commandCatch(state, pokemonName) {
    try {
        if (!pokemonName) {
            console.log('Please provide a pokemon name');
            return;
        }
        console.log(`Throwing a Pokeball at ${pokemonName}...`);
        const pokemon = await state.pokeApi.fetchPokemonInfo(pokemonName);
        if (pokemon) {
            const chance = Math.exp(-DIFFICULTY * pokemon.base_experience);
            const roll = Math.random();
            const pokemonCaught = roll < chance;
            console.log(pokemonCaught
                ? `${pokemonName} was caught!`
                : `${pokemonName} escaped!`);
            if (pokemonCaught) {
                console.log('You may now inspect it with the inspect command.');
            }
            if (!pokemonCaught || state.pokedex[pokemonName])
                return;
            state.pokedex = { ...state.pokedex, [pokemonName]: pokemon };
        }
    }
    catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
}
