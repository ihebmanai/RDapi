export const asyncLocalStorage = {
    setItem: async function (key, value) {
        await Promise.resolve();
        localStorage.setItem(key, value);
    },
    getItem: async function (key) {
        await Promise.resolve();
        return localStorage.getItem(key);
    }
};
