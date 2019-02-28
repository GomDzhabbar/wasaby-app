/// <amd-module name="Application/_Interface/ISerializableState" />
import { HashMap, Native } from "Application/_Type";

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
