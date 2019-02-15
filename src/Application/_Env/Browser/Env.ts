/// <amd-module name='Application/_Env/Browser/Env' />
import Config from 'Application/_Config/Config';
import Cookie from 'Application/_Env/Browser/Cookie';
import Store from 'Application/_Env/Browser/Store';
import Console, { LogLevel } from 'Application/_Env/Console';
import ObjectStore from 'Application/_Env/ObjectStore';
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie } from 'Application/_Interface/ICookie';
import { IEnv } from 'Application/_Interface/IEnv';
import { ILocation } from 'Application/_Interface/ILocation';
import { IStorageMap, IStore } from 'Application/_Interface/IStore';

export default class EnvBrowser implements IEnv {
    console: IConsole
    cookie: ICookie
    location: ILocation
    storages: IStorageMap

    constructor(cfg: Config) {
        this.location = window.location;
        this.console = new Console(window.console);
        if (cfg.get("Application/Env.LogLevel") !== undefined) {
            this.console.setLogLevel(<LogLevel> cfg.get("Application/Env.LogLevel"));
        }

        this.cookie = new Cookie();

        let localStorage: IStore;
        try {
            localStorage = new Store(window.localStorage);
        } catch (e) {
            localStorage = new ObjectStore();
            this.console.warning("Can't use localStorage", e);
        }
        let sessionStorage: IStore;
        try {
            sessionStorage = new Store(window.sessionStorage);
        } catch (e) {
            sessionStorage = new ObjectStore();
            this.console.warning("Can't use sessionStorage", e);
        }

        this.storages = {
            "localStorage": localStorage,
            "sessionStorage": sessionStorage
        }
    }

    static create(cfg: Config) {
        return new EnvBrowser(cfg);
    }
}
