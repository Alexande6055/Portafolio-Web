const EXPIRATION_TIME = 4 * 24 * 60 * 60 * 1000; // 4 días en milisegundos

export function saveToLocalStorage<T>(key: string, data: T) {
    const payload = {
        data,
        timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(payload));
}

export function getFromLocalStorage<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
        const parsed = JSON.parse(item);
        if (Date.now() - parsed.timestamp > EXPIRATION_TIME) {
            localStorage.removeItem(key); // expira
            return null;
        }
        return parsed.data as T;
    } catch {
        return null;
    }
}
