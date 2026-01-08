export class PokeAPI {
    static baseURL = 'https://pokeapi.co/api/v2';
    #cache;
    constructor(cacheInstance) {
        this.#cache = cacheInstance;
    }
    async fetchLocations(pageURL) {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;
        console.log({ url });
        console.log(this.#cache);
        if (this.#cache.get(url)) {
            console.log('got form cacher');
            return this.#cache.get(url)?.val;
        }
        try {
            const res = await fetch(url, {
                method: 'GET',
            });
            const locations = (await res.json());
            this.#cache.add(url, locations);
            console.log('add to cacher');
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
            const location = (await res.json());
            this.#cache.add(url, location);
            return location;
        }
        catch (error) {
            console.log(`An error occurred while fetching the location: ${error instanceof Error ? error.message : error}`);
        }
    }
}
