export async function commandInspect(state, pokemonName) {
    try {
        if (!pokemonName) {
            console.log('Please provide a pokemon name');
            return;
        }
        const pokemonInfo = state.pokedex[pokemonName];
        if (!pokemonInfo) {
            console.log('you have not caught that pokemon');
            return;
        }
        console.log(`Name: ${pokemonInfo.name}`);
        console.log(`Height: ${pokemonInfo.height}`);
        console.log(`Weight: ${pokemonInfo.weight}`);
        console.log('Stats:');
        pokemonInfo.stats.forEach(stat => {
            console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
        });
        console.log('Types:');
        pokemonInfo.types.forEach(type => {
            console.log(`  - ${type.type.name}`);
        });
    }
    catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
}
