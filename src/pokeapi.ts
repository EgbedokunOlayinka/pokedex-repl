import {Cache} from './pokecache';

export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';
  #cache: Cache;

  constructor(cacheInstance: Cache) {
    this.#cache = cacheInstance;
  }

  async fetchLocations(
    pageURL?: string,
  ): Promise<ShallowLocations | undefined> {
    const url =
      pageURL ?? `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;

    if (this.#cache.get(url)) {
      return this.#cache.get(url)?.val;
    }

    try {
      const res = await fetch(url, {
        method: 'GET',
      });
      const locations = (await res.json()) as ShallowLocations;

      this.#cache.add(url, locations);

      return locations;
    } catch (error) {
      console.log(
        `An error occurred while fetching locations: ${
          error instanceof Error ? error.message : error
        }`,
      );
    }
  }

  async fetchLocation(locationName: string): Promise<FullLocation | undefined> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    if (this.#cache.get(url)) {
      return this.#cache.get(url)?.val;
    }

    try {
      const res = await fetch(url, {
        method: 'GET',
      });
      const location = (await res.json()) as FullLocation;

      this.#cache.add(url, location);

      return location;
    } catch (error) {
      console.log(
        `An error occurred while fetching the location: ${
          error instanceof Error ? error.message : error
        }`,
      );
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: any;
  results: Location[];
};

export interface FullLocation {
  encounter_method_rates: EncounterMethodRate[];
  game_index: number;
  id: number;
  location: Location;
  name: string;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod;
  version_details: VersionDetail[];
}

export interface EncounterMethod {
  name: string;
  url: string;
}

export interface VersionDetail {
  rate: number;
  version: Version;
}

export interface Version {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Name {
  language: Language;
  name: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface PokemonEncounter {
  pokemon: Pokemon;
  version_details: VersionDetail2[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface VersionDetail2 {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Version2;
}

export interface EncounterDetail {
  chance: number;
  condition_values: any[];
  max_level: number;
  method: Method;
  min_level: number;
}

export interface Method {
  name: string;
  url: string;
}

export interface Version2 {
  name: string;
  url: string;
}
