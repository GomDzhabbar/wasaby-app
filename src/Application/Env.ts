/// <amd-module name="Application/Env" />
export { default as EnvBrowser } from "Application/_Env/Browser/Env";
export { LogLevel } from "Application/_Env/Console";
import { IConsole } from "Application/_Interface/IConsole";
import Request from "Application/_Request/Request";

export function getLocation() {
    return Request.getCurrent().location;
}

export function getCookie(key) {
    return Request.getCurrent().cookie.get(key);
}

export function setCookie(key, value) {
    return Request.getCurrent().cookie.set(key, value);
}

export function removeCookie(key) {
    return Request.getCurrent().cookie.remove(key);
}

export const logger: IConsole = {
    setLogLevel(level: number) {
        return Request.getCurrent().console.setLogLevel(level);
    },

    getLogLevel() {
        return Request.getCurrent().console.getLogLevel();
    },

    log(...args) {
        const console = Request.getCurrent().console;
        return console.log.apply(console, args);
    },

    info(...args) {
        const console = Request.getCurrent().console;
        return console.info.apply(console, args);
    },

    warning(...args) {
        const console = Request.getCurrent().console;
        return console.warning.apply(console, args);
    },

    error(...args) {
        const console = Request.getCurrent().console;
        return console.error.apply(console, args);
    }
};

export function getStateReceiver() {
    return Request.getCurrent().getStateReceiver();
}

export function getStorage(type) {
    return Request.getCurrent().getStorage(type);
}
