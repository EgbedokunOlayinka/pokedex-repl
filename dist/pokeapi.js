export class PokeAPI {
    static baseURL = 'https://pokeapi.co/api/v2';
    #cache;
    constructor(cacheInstance) {
        this.#cache = cacheInstance;
    }
    async fetchLocations(pageURL) {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;
        if (this.#cache.get(url)) {
            return this.#cache.get(url)?.val;
        }
        try {
            const res = await fetch(url, {
                method: 'GET',
            });
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const locations = (await res.json());
            this.#cache.add(url, locations);
            return locations;
        }
        catch (error) {
            console.log(`An error occurred while fetching locations: ${error instanceof Error ? error.message : error}`);
        }
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        if (this.#cache.get(url)) {
            return this.#cache.get(url)?.val;
        }
        try {
            const res = await fetch(url, {
                method: 'GET',
            });
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const location = (await res.json());
            this.#cache.add(url, location);
            return location;
        }
        catch (error) {
            console.log(`An error occurred while fetching the location: ${error instanceof Error ? error.message : error}`);
        }
    }
    async fetchPokemonInfo(pokemonName) {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        if (this.#cache.get(url)) {
            return this.#cache.get(url)?.val;
        }
        try {
            const res = await fetch(url, {
                method: 'GET',
            });
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const pokemon = (await res.json());
            this.#cache.add(url, pokemon);
            return pokemon;
        }
        catch (error) {
            console.log(`An error occurred while fetching the pokemon info: ${error instanceof Error ? error.message : error}`);
        }
    }
}
