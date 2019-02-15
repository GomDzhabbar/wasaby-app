/// <amd-module name="Application/_Interface/IRequest" />
import Config from 'Application/_Config/Config';
import { IConsole } from "Application/_Interface/IConsole";
import { ICookie } from 'Application/_Interface/ICookie';
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
    getStorage(key: any): IStore;
}
