export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(intervalValue: number) {
    this.#interval = intervalValue;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, {
      val,
      createdAt: Date.now(),
    });

    const test = setTimeout(() => {});
  }

  get<T>(key: string) {
    return this.#cache.get(key);
  }

  #reap() {
    const cutoff = Date.now() - this.#interval;
    this.#cache.forEach((value, key) => {
      if (value.createdAt < cutoff) {
        this.#cache.delete(key);
      }
    });
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}

export type CacheEntry<T> = {
  val: T;
  createdAt: number;
};
