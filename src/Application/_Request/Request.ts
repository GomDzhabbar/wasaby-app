/// <amd-module name="Application/_Request/Request" />
import Config from "Application/_Config/Config";
import Store, { FakeWebStorage } from 'Application/_Env/Browser/Store';
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie } from 'Application/_Interface/ICookie';
import { IEnv } from 'Application/_Interface/IEnv';
import { ILocation } from 'Application/_Interface/ILocation';
import { IRequest } from 'Application/_Interface/IRequest';
import { IStateReceiver } from 'Application/_Interface/IStateReceiver';
import { IStoreMap } from 'Application/_Interface/IStore';
import { IStore } from 'Application/_Interface/IStore';

let globalEnv: IRequest = null;

/**
 * @class
 * @name Env/_Request/Request
 * @implements Application/Interface/IRequest
 * @public
 * @author Санников К.А.
 * @see Application/Interface/IStorage
 * @see Application/Interface/ILocation
 * @see Application/Interface/IConsole
 * @see Application/Interface/ISerializableState
 * @see Application/Interface/IStateReceiver
 * @todo добавить пример
 */
export default class AppRequest implements IRequest {
    private readonly __config: Config;

    /**
     * @property
     * @type {Application/Interface.IConsole}
     */
    console: IConsole;

    /**
     * @property
     * @type {Application/Interface.ICookie}
     */
    cookie: ICookie;

    /**
     * @property
     * @type {Application/Interface.ILocation}
     */
    location: ILocation;

    /**
     * @property
     * @type {Application/Interface.IStateReceiver}
     */
    private __stateReceiver: IStateReceiver;

    private readonly __storages: IStoreMap;

    constructor(env: IEnv, config: Config) {
        let {
            console,
            cookie,
            storages,
            location
        } = env;

        this.console = console;
        this.cookie = cookie;
        this.location = location;
        this.__config = config;
        this.__storages = storages;
    }

    /**
     * Получение хранилища для сохранений данных в рамках запроса.
     * @param {string} key Тип хранилища
     */
    getStore(key: string): IStore {
        if (!this.__storages[key]) {
            this.__storages[key] = new Store(new FakeWebStorage());
        }
        return this.__storages[key];
    }

    /**
     * FIXME нужны ли нам Storage?
     */
    addStore(key: string, storage: IStore) {
        if (this.__storages[key]) {
            throw new Error(`attempt to overwrite used storage "${key}"`);
        }
        this.__storages[key] = storage;
    }

    setStateReceiver(stateReceiver: IStateReceiver) {
        this.__stateReceiver = stateReceiver;
    }

    getStateReceiver() {
        return this.__stateReceiver;
    }

    getConfig(): Config {
        return this.__config;
    }

    /**
     * @param {Env/IRequest} request
     * @static
     * @name Env/Request#setCurrent
     */
    static setCurrent(request: IRequest) {
        globalEnv = request;
    }

    /**
     * @return {Env/IRequest}
     * @static
     * @name Env/Request#getCurrent
     */
    static getCurrent(): IRequest | null {
        return globalEnv;
    }
}
