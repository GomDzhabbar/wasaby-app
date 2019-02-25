/// <amd-module name="Application/_Env/Browser/Store" />
import { IStore } from "Application/_Interface/IStore";

/**
 * Эмуляция любого Storage браузера
 */
export class FakeWebStorage implements Storage {
    private __data = {};

    // @TODO можно оптимизировать
    get length(): number {
        return Object.keys(this.__data).length;
    }

    getItem(key: string) {
        return this.__data[key];
    }

    setItem(key: string, value: string) {
        this.__data[key] = value;
        return true;
    }

    removeItem(key: string) {
        delete this.__data[key];
    }

    key(index: number) {
        return Object.keys(this.__data)[index];
    }

    clear() {
        this.__data = {};
    }
}

/**
 * Класс, реализующий интерфейс {@link Core/Request/IStore},
 * предназначенный для работы с localStorage и SessionStorage
 * @class
 * @name Application/_Env/Browser/Store
 * @implements Application/_Interface/IStore
 * @author Санников К.А.
 */
export default class Store implements IStore {
    private __storage: Storage;
    constructor(storageType: Storage) {
        this.__storage = storageType;
    }

    get(key: string) {
        try {
            return this.__storage.getItem(key);
        } catch (err) {
            // ignore
        }
    }

    set(key: string, data: string) {
        try {
            this.__storage.setItem(key, data);
            return true;
        } catch (err) {
            // ignore
            return false;
        }
    }

    remove(key: string) {
        try {
            this.__storage.removeItem(key);
        } catch (err) {
            // ignore
        }
    }

    getKeys() {
        try {
            return Object.keys(this.__storage);
        } catch (err) {
            return []
        }
    }

    toObject() {
        try {
            return {
                ...this.__storage
            }
        } catch (err) {
            return {}
        }
    }
}
