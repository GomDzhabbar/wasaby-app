/// <amd-module name="Application/_Interface/IConsole" />
/**
 * Интерфейс для логгера. Для того что бы избавиться от IoC('ILogger').
 * IoC вызывает у нас много непонятных проблем с цикличной зависимостью.
 * @interface
 * @name Core/Request/IConsole
 */
export interface IConsole {
    setLogLevel(logLevel: number): void;
    getLogLevel(): number;
    info(...args: any): void;
    log(...args: any): void;
    warning(...args: any): void;
    error(...args: any): void;
}
