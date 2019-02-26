/// <amd-module name="Application/Type" />
declare module "Application/Type" {
    export type Native = string | number | boolean;
    export type HashMap<T> = {
        [key: string]: T;
    };
}
/// <amd-module name="Application/_Interface/IStateReceiver" />
declare module "Application/_Interface/IStateReceiver" {
    import { HashMap, Native } from "Application/Type";
    /**
     * Интерфейс, который нужно поддержать компонентам, что бы их можно было сериализовать
     * и восстановливать их состояние в любой момент
     * @name Core/Request/ISerializableState
     * @interface
     * @example
     * <pre>
     * const DEFAULT_STATE = {
     *     // ...
     * }
     * class Control implements ISerializableState {
     *    private __uid: string;
     *    protected _state: HashMap<Native>;
     *    constructor(...args) {
     *        stateReceiver.register(this.__uid, this);
     *        // ...
     *    }
     *    getState(): HashMap<Native> {
     *        return this._state || {}
     *    }
     *    setState(data: HashMap<Native>): void {
     *        this._state = {
     *            ...DEFAULT_STATE,
     *            ...data
     *        }
     *        this._redraw();
     *    }
     *    destroy() {
     *        stateReceiver.unregister(this.__uid);
     *        // ...
     *    }
     * }
     * </pre>
     */
    export interface ISerializableState {
        /**
         * Получаем состояние для сериализации
         * @return {HashMap<string>}
         * @name Core/Request/ISerializableState#getState
         * @method
         */
        getState(): HashMap<Native>;
        /**
         * Устанавливаем состоиня после десериализации
         * @param {HashMap<string>} data
         * @name Core/Request/ISerializableState#setState
         * @method
         */
        setState(data: HashMap<Native>): void;
    }
}
/// <amd-module name="Application/_Config/Config" />
declare module "Application/_Config/Config" {
    import { ISerializableState } from "Application/_Interface/IStateReceiver";
    import { HashMap, Native } from "Application/Type";
    export default class Config implements ISerializableState {
        private data;
        private __uid;
        constructor(data?: HashMap<Native>, __uid?: string);
        get(key: string): Native;
        getState(): HashMap<Native>;
        setState(data: HashMap<Native>): void;
        getUID(): string;
    }
}
/// <amd-module name="Application/_Interface/IStore" />
declare module "Application/_Interface/IStore" {
    /**
     * Описание интерфейса компонента, для работы неким Storage.
     * Необходим для того что бы создавать хранилище на клиенте и на сервисе представления.
     * @interface
     * @name Application/_Interface/IStorage
     */
    export interface IStore<T = string> {
        get(key: string): T | null;
        set(key: string, value: T): boolean;
        remove(key: string): void;
        getKeys(): string[];
        toObject(): {
            [key: string]: string;
        };
    }
    export interface IStoreMap {
        [propName: string]: IStore;
    }
}
/// <amd-module name="Application/_Env/Browser/Store" />
declare module "Application/_Env/Browser/Store" {
    import { IStore } from "Application/_Interface/IStore";
    /**
     * Эмуляция любого Storage браузера
     */
    export class FakeWebStorage implements Storage {
        private __data;
        readonly length: number;
        getItem(key: string): any;
        setItem(key: string, value: string): boolean;
        removeItem(key: string): void;
        key(index: number): string;
        clear(): void;
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
        private __storage;
        constructor(storageType: Storage);
        get(key: string): string;
        set(key: string, data: string): boolean;
        remove(key: string): void;
        getKeys(): string[];
        toObject(): {};
    }
}
/// <amd-module name="Application/_Interface/IConsole" />
declare module "Application/_Interface/IConsole" {
    /**
     * Интерфейс для логгера. Для того что бы избавиться от IoC('ILogger').
     * IoC вызывает у нас много непонятных проблем с цикличной зависимостью.
     * @interface
     * @name Application/Interface/IConsole
     */
    export interface IConsole {
        setLogLevel(logLevel: number): void;
        getLogLevel(): number;
        info(...args: any): void;
        log(...args: any): void;
        warning(...args: any): void;
        error(...args: any): void;
    }
}
/// <amd-module name="Application/_Interface/ICookie" />
declare module "Application/_Interface/ICookie" {
    export interface ICookieOptions {
        domain: string;
        expires: number | Date;
        path: string;
        secure: string;
    }
    export interface ICookie {
        /**
         * Получение значение из cookie
         * @param key {string}
         */
        get(key: string): string;
        /**
         * Устанавливаем cookie
         * @param key {string}
         * @param value {string}
         * @param options {Partial<ICookieOptions>}
         * @throws {Error} ошибка установки значения
         */
        set(key: string, value: string, options?: Partial<ICookieOptions>): boolean;
        /**
         * Удаляем cookie
         * @param key {string}
         * @throws {Error} ошибка очистки значения
         */
        remove(key: string): void;
    }
}
/// <amd-module name="Application/_Interface/ILocation" />
declare module "Application/_Interface/ILocation" {
    /**
     * Описание обобщенного window.location.
     * Выписаны те поля, которые есть на сервисе представления и в браузере
     * @interface
     * @name Core/Request/ILocation
     */
    export interface ILocation {
        protocol: string;
        host: string;
        hostname: string;
        port: string;
        hash: string;
        href: string;
        pathname: string;
        search: string;
    }
}
/// <amd-module name="Application/_Interface/IEnv" />
declare module "Application/_Interface/IEnv" {
    import Config from "Application/_Config/Config";
    import { IConsole } from "Application/_Interface/IConsole";
    import { ICookie } from "Application/_Interface/ICookie";
    import { ILocation } from "Application/_Interface/ILocation";
    import { IStoreMap } from "Application/_Interface/IStore";
    export interface IEnv {
        console: IConsole;
        cookie: ICookie;
        location: ILocation;
        storages: IStoreMap;
    }
    export interface IEnvFactory {
        create(config: Config): IEnv;
    }
}
/// <amd-module name="Application/_Interface/IStateReceiver" />
declare module "Application/_Interface/IStateReceiver" {
    import { ISerializableState } from "Application/_Interface/IStateReceiver";
    /**
     * Инетрфейс компонента для восстановления состояний компонентов.
     * Необходим для получения данных состояний компонентов созданных на сервер.
     * @interface
     * @name Application/_Interface/IStateReceiver
     */
    export interface IStateReceiver {
        /**
         * Получеие сериализованного состояния всех зарегестрированных компонент
         * Используется для сохранения состояния страницы при построении на сервере
         * @return {String}
         */
        serialize(): string;
        /**
         * Метод, устанавливающий состояние всем зарегестрированным компонентам.
         * Используется при оживлении страницы после серверной вёрстки
         * @param {String} data
         */
        deserialize(data: string): void;
        /**
         * Регистрация компонентов, состояние которыех необходимо сохранить.
         * @param {String} uid идентификатор инстанса, для идентификации сохраненного для него состояния
         * @param {Application/_Interface/ISerializableState} component сериализируемый компонент
         */
        register(uid: string, component: ISerializableState): void;
        unregister(uid: string): void;
    }
}
/// <amd-module name="Application/_Interface/IRequest" />
declare module "Application/_Interface/IRequest" {
    import Config from "Application/_Config/Config";
    import { IConsole } from "Application/_Interface/IConsole";
    import { ICookie } from "Application/_Interface/ICookie";
    import { ILocation } from "Application/_Interface/ILocation";
    import { IStateReceiver } from "Application/_Interface/IStateReceiver";
    import { IStore } from "Application/_Interface/IStore";
    /**
     * Компонент, которые предоставляет в платформе доступ к синглтонам в раках запроса пользователя.
     */
    export interface IRequest {
        cookie: ICookie;
        location: ILocation;
        console: IConsole;
        getConfig(): Config;
        /**
         * Доступ к объекту сохранения состояния на сервиспе представлений,
         *  для его получения на клиенте. Не привязан к VDOM механизмам,
         *  поэтому можно будет его использовать в не визуальных компонентах.
         */
        getStateReceiver(): IStateReceiver;
        /**
         * Получение хранилища для сохранений данных в рамках запроса.
         * @param key Тип хранилища.
         */
        getStore(key: string): IStore;
    }
}
/// <amd-module name="Application/_Request/Request" />
declare module "Application/_Request/Request" {
    import Config from "Application/_Config/Config";
    import { IConsole } from "Application/_Interface/IConsole";
    import { ICookie } from "Application/_Interface/ICookie";
    import { IEnv } from "Application/_Interface/IEnv";
    import { ILocation } from "Application/_Interface/ILocation";
    import { IRequest } from "Application/_Interface/IRequest";
    import { IStateReceiver } from "Application/_Interface/IStateReceiver";
    import { IStore } from "Application/_Interface/IStore";
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
        private readonly __config;
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
        private __stateReceiver;
        private readonly __storages;
        constructor(env: IEnv, config: Config);
        /**
         * Получение хранилища для сохранений данных в рамках запроса.
         * @param {string} key Тип хранилища
         */
        getStore(key: string): IStore;
        /**
         * FIXME нужны ли нам Storage?
         */
        addStore(key: string, storage: IStore): void;
        setStateReceiver(stateReceiver: IStateReceiver): void;
        getStateReceiver(): IStateReceiver;
        getConfig(): Config;
        /**
         * @param {Env/IRequest} request
         * @static
         * @name Env/Request#setCurrent
         */
        static setCurrent(request: IRequest): void;
        /**
         * @return {Env/IRequest}
         * @static
         * @name Env/Request#getCurrent
         */
        static getCurrent(): IRequest | null;
    }
}
/// <amd-module name="Application/Config" />
declare module "Application/Config" {
    export function get(key: string): import("Application/Type").Native;
}
/// <amd-module name="Application/_Env/Browser/Cookie" />
declare module "Application/_Env/Browser/Cookie" {
    import { ICookie, ICookieOptions } from "Application/_Interface/ICookie";
    import { IStore } from "Application/_Interface/IStore";
    /**
     * Класс, реализующий интерфейс {@link Core/Request/IStorage},
     * предназначенный для работы с cookie в браузере
     * @class
     * @name _Request/_Storage/Cookie
     * @implements Core/Request/IStorage
     * @author Заляев А.В
     */
    export default class Cookie implements ICookie, IStore<string> {
        cosntructor(): void;
        get(key: string): any;
        set(key: string, value: string, options?: Partial<ICookieOptions>): boolean;
        remove(key: string): void;
        getKeys(): string[];
        toObject(): {};
    }
}
/// <amd-module name="Application/_Env/Console" />
declare module "Application/_Env/Console" {
    import { IConsole } from "Application/_Interface/IConsole";
    export enum LogLevel {
        info = 0,
        warning = 1,
        error = 2
    }
    export default class Console implements IConsole {
        private __logLevel;
        private __console;
        constructor(console: any);
        private isShow;
        setLogLevel(mode: LogLevel): void;
        getLogLevel(): LogLevel;
        info(): void;
        log(): void;
        warning(): any;
        error(): void;
    }
}
/// <amd-module name="Application/_Env/ObjectStore" />
declare module "Application/_Env/ObjectStore" {
    import { IStore } from "Application/_Interface/IStore";
    export default class ObjectStore implements IStore {
        private __data;
        get(key: string): any;
        set(key: string, value: string): boolean;
        remove(key: string): void;
        getKeys(): string[];
        toObject(): {};
    }
}
/// <amd-module name="Application/_Env/Browser/Env" />
declare module "Application/_Env/Browser/Env" {
    import Config from "Application/_Config/Config";
    import { IConsole } from "Application/_Interface/IConsole";
    import { ICookie } from "Application/_Interface/ICookie";
    import { IEnv } from "Application/_Interface/IEnv";
    import { ILocation } from "Application/_Interface/ILocation";
    import { IStoreMap } from "Application/_Interface/IStore";
    export default class EnvBrowser implements IEnv {
        console: IConsole;
        cookie: ICookie;
        location: ILocation;
        storages: IStoreMap;
        constructor(cfg: Config);
        static create(cfg: Config): EnvBrowser;
    }
}
/// <amd-module name="Application/Env" />
declare module "Application/Env" {
    export { default as EnvBrowser } from "Application/_Env/Browser/Env";
    export { LogLevel } from "Application/_Env/Console";
    import { IConsole } from "Application/_Interface/IConsole";
    import { ICookie } from "Application/_Interface/ICookie";
    import { ILocation } from "Application/_Interface/ILocation";
    import { IStateReceiver } from "Application/_Interface/IStateReceiver";
    import { IStore } from "Application/_Interface/IStore";
    export function getLocation(): ILocation;
    export const cookie: ICookie;
    export const logger: IConsole;
    export function getStateReceiver(): IStateReceiver;
    export function getStore(type: string): IStore;
}
/// <amd-module name="Application/_Interface/IConfig" />
declare module "Application/_Interface/IConfig" {
    import { Native } from "Application/Type";
    export interface IConfig {
        get(key: string): Native;
    }
}
/// <amd-module name="Application/Interface" />
declare module "Application/Interface" {
    export * from "Application/_Interface/IConsole";
    export * from "Application/_Interface/ICookie";
    export * from "Application/_Interface/IConfig";
    export * from "Application/_Interface/IEnv";
    export * from "Application/_Interface/ILocation";
    export * from "Application/_Interface/IStateReceiver";
    export * from "Application/_Interface/IStore";
    export * from "Application/_Interface/IStateReceiver";
    export * from "Application/_Interface/IRequest";
}
/// <amd-module name="Application/_Env/Browser/StateReceiver" />
declare module "Application/_Env/Browser/StateReceiver" {
    import { HashMap, Native } from "Application/Type";
    import { IConsole, ISerializableState, IStateReceiver } from "Application/Interface";
    type StateMap = HashMap<HashMap<Native>>;
    export type StateReceiverConfig = {
        states?: StateMap;
        console?: IConsole;
    };
    /**
     * Класс, реализующий интерфейс {@link Core/Request/IStateReceiver},
     * позволяющий сохранять состояние компонентов
     *
     * @class
     * @name _Request/StateReceiver
     * @implements Core/Request/IStateReceiver
     * @author Заляев А.В
     * @private
     */
    export default class StateReceiver implements IStateReceiver {
        private __states;
        private __components;
        private readonly __console;
        constructor(states?: any, console?: IConsole);
        /**
         * Получеие сериализованного состояния всех зарегестрированных компонент
         * @return {String}
         * @method
         * @name _Request/StateReceiver#serialize
         */
        serialize(): string;
        /**
         * Метод, устанавливающий состояние всем зарегестрированным компонентам.
         * @param {String} data
         * @method
         * @name _Request/StateReceiver#deserialize
         */
        deserialize(data: string): void;
        /**
         * Регистрация компонентов, состояние которыех необходимо сохранить.
         * @param {String} uid идентификатор инстанса, для идентификации сохраненного для него состояния
         * @param {Core/Request/ISerializableState} component Сериализируемый компонент
         * @method
         * @name _Request/StateReceiver#register
         */
        register(uid: string, component: ISerializableState): void;
        unregister(uid: string): void;
        private __updateState;
        private __setComponentState;
    }
}
/// <amd-module name="Application/Initializer" />
declare module "Application/Initializer" {
    export { default as StateReceiver } from "Application/_Env/Browser/StateReceiver";
    export { default as Cookie } from "Application/_Env/Browser/Cookie";
    export { default as Store } from "Application/_Env/Browser/Store";
    export { default as ObjectStore } from "Application/_Env/ObjectStore";
    import { IEnvFactory } from "Application/_Interface/IEnv";
    import { IStateReceiver } from "Application/_Interface/IStateReceiver";
    import Request from "Application/_Request/Request";
    import { HashMap } from "Application/Type";
    import { ISerializableState } from "Application/_Interface/IStateReceiver";
    export default function init(defaultConfigData?: HashMap<string>, envFactory?: IEnvFactory, stateReceiver?: IStateReceiver): Request;
    export function registerComponent(uid: string, component: ISerializableState): void;
}
