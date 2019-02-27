/// <amd-module name='Application/_Env/Console' />
/* tslint:disable:no-console */
/* eslint-disable no-console */
import { IConsole } from 'Application/_Interface/IConsole';

const checkConsoleMethod = (console, method: string) => console && (typeof console[method] === 'function');

export enum LogLevel {
    info = 0,
    warning = 1,
    error = 2
}

export default class Console implements IConsole {
    private __logLevel: LogLevel;
    private __console;
    constructor(console) {
        this.__logLevel = LogLevel.error;
        this.__console = console;
    }

    private isShow(level: LogLevel): boolean {
        return level >=  this.__logLevel;
    }

    setLogLevel(mode: LogLevel) {
        this.__logLevel = mode;
    };

    getLogLevel(): LogLevel {
        return this.__logLevel;
    };

    info() {
        if (this.isShow(LogLevel.info) && checkConsoleMethod(this.__console, 'info')) {
            console.info.apply(undefined, arguments);
        }
    };

    log() {
        if (this.isShow(LogLevel.info) && checkConsoleMethod(this.__console, 'log')) {
            console.log.apply(undefined, arguments);
        }
    };

    warn() {
        if (!this.isShow(LogLevel.warning)) {
            return;
        }
        if (checkConsoleMethod(this.__console, 'error')) {
            return console.warn.apply(undefined, arguments);
        }
        if (checkConsoleMethod(this.__console, 'log')) {
            return console.log.apply(undefined, arguments);
        }
    };

    error() {
        if (!this.isShow(LogLevel.error) || !checkConsoleMethod(this.__console, 'error')) {
            return;
        }
        console.error.apply(undefined, arguments);
    };
}
