declare global {
    var store: Map<string, any> | undefined;
}

const store = globalThis.store ?? new Map();

globalThis.store = store;

export function setStore(id: string, value: any) {
    store.set(id, value);
}

export function getStore(id: string) {
    return store.get(id);
}