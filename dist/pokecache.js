export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(intervalValue) {
        this.#interval = intervalValue;
        this.#startReapLoop();
    }
    add(key, val) {
        this.#cache.set(key, {
            val,
            createdAt: Date.now(),
        });
        const test = setTimeout(() => { });
    }
    get(key) {
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
