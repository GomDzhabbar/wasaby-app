/// <amd-module name="Application/_Request/Request" />
import Config from "Application/_Config/Config";
import Store, { FakeWebStorage } from 'Application/_Env/Browser/Store';
import { IStorageMap } from 'Application/_Interface/IStore';
import { IConsole } from 'Application/_Interface/IConsole';
import { ILocation } from 'Application/_Interface/ILocation';
import { IStateReceiver } from 'Application/_Interface/IStateReceiver';
import { IStore } from 'Application/_Interface/IStore';
import { IRequest } from 'Application/_Interface/IRequest';
import { IEnv } from 'Application/_Interface/IEnv';

let globalEnv: IRequest = null;

/**
 *
 * @class
 * @name IStateReceiver
 * @implements Env/IRequest
 * @public
 * @author Заляев А.В
 * @see Core/Request/IStorage
 * @see Core/Request/ILocation
 * @see Core/Request/IConsole
 * @see Core/Request/ISerializableState
 * @see Core/Request/IStateReceiver
 * @example
 * <h2>Работа с singleton(в рамках одного потока/запроса) хранилищами</h2>
 * <pre>
 *     import CoreRequest = require('Core/Request');
 *     const LAST_ENTRANCE_KEY = 'debug';
 *
 *     let getCurrentRequest = () => CoreRequest.getCurrent();
 *     let getLocalStorage = () => getCurrentRequest().getStorage(CoreRequest.StorageKey.localStorage);
 *
 *     let lastEntrance = getLocalStorage().get(LAST_ENTRANCE_KEY);
 *     if (lastEntrance) {
 *         getCurrentRequest().console.log(`last visit was ${(lastEntrance - Date.now())/1000} second ago`)
 *     }
 *     getLocalStorage().set(LAST_ENTRANCE_KEY, Date.now());
 * </pre>
 * <h2>Сохранение состояния своего компонента при построении на сервере</h2>
 * <pre>
 *     import CoreRequest = require('Core/Request');
 *     import Page = require('MyService/Page'); // implements Core/Request/ISerializableState
 *
 *     let mainPage = new Page({
 *         // ...
 *     });
 *     CoreRequest.getCurrent().getStateReceiver().register(mainPage.getUid(), mainPage);
 * </pre>
 */
export default class AppRequest implements IRequest {
    private readonly __config: Config;
    /**
     * @property
     * @type {Env/Request/ILocation}
     */
    location: ILocation;
    /**
     * @property
     * @type {Env/Request/IConsole}
     */
    console: IConsole;
    /**
     * @property
     * @type {Env/Request/IStateReceiver}
     */
    private __stateReceiver: IStateReceiver;

    private readonly __storages: IStorageMap;

    constructor(env: IEnv, config: Config) {
        let {
            storages,
            console,
            location
        } = env;

        this.__storages = storages;
        this.console = console;
        this.location = location;
        this.__config = config;
    }

    /**
     * Получение хранилища для сохранений данных в рамках запроса.
     * @param {string} key Тип хранилища
     */
    getStorage(key: string): IStore {
        if (!this.__storages[key]) {
            this.__storages[key] = new Store(new FakeWebStorage());
        }
        return this.__storages[key];
    }

    /**
     * FIXME нужны ли нам Storage?
     */
    addStorage(key: string, storage: IStore) {
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
