/// <amd-module name='Application/_Env/Browser/Env' />
import Config from 'Application/_Config/Config';
import Console, { LogLevel } from 'Application/_Env/Console';
import Storage from 'Application/_Env/Browser/Store';
import ObjectStorage from 'Application/_Env/ObjectStorage';
import { IStorageMap } from 'Application/_Interface/IStore';
import { IEnv } from 'Application/_Interface/IEnv';
import { IConsole } from 'Application/_Interface/IConsole';
import { ILocation } from 'Application/_Interface/ILocation';

export default class EnvBrowser implements IEnv {
    location: ILocation
    console: IConsole
    storages: IStorageMap

    constructor(cfg: Config) {
        this.location = window.location;
        this.console = new Console(window.console);
        if (cfg.get("Application/Env.LogLevel") !== undefined) {
            this.console.setLogLevel(<LogLevel> cfg.get("Application/Env.LogLevel"));
        }

        let localStorage;
        try {
            localStorage = new Storage(window.localStorage);
        } catch (e) {
            localStorage = new ObjectStorage();
            this.console.warning("Can't use localStorage", e);
        }
        let sessionStorage;
        try {
            sessionStorage = new Storage(window.sessionStorage);
        } catch (e) {
            sessionStorage = new ObjectStorage();
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
