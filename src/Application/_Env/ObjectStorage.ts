/// <amd-module name="Application/_Env/ObjectStorage" />
import { IStore } from "Application/_Interface/IStore";
import { HashMap } from 'Application/_Type';

/**
 * Класс, реализующий интерфейс {@link Application/_Interface/IStorage}, сохраняющий данные в внутренний объект
 * @class
 * @name Application/_Env/Browser/ObjectStorage
 * @author Заляев А.В
 */
export default class ObjectStorage implements IStore {
    private _map: HashMap<string> = Object.create(null);
    get(key: string): string | null {
        return this._map[key] || null;
    };
    set(key: string, value: string): boolean {
        this._map[key] = value;
        return true;
    };
    remove(key: string): void {
        delete this._map[key];
    };
    getKeys(): Array<string> {
        return Object.keys(this._map);
    };
    toObject(): HashMap<string> {
        return {
            ...this._map
        }
    };
}
