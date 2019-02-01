/// <amd-module name="Application/_Interface/IStore" />
/**
 * Описание интерфейса компонента, для работы неким Storage.
 * Необходим для того что бы создавать хранилище на клиенте и на сервисе представления.
 * @interface
 * @name Application/_Interface/IStorage
 */
export interface IStore < T = string >  {
    get(key: string): T | null;
    set(key: string, value: T): boolean;
    remove(key: string): void;
    getKeys(): string[];
    toObject(): {[key: string]: string};
}

export interface IWebStorage<T = string> {
    getItem(key: string): T | null;
    setItem(key: string, value: T): boolean;
    removeItem(key: string): void;
}

export interface IStorageMap {
    [propName: string]: IStore;
}
