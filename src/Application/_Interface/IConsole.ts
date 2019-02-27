/// <amd-module name="Application/_Interface/IConsole" />
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
    warn(...args: any): void;
    error(...args: any): void;
}
