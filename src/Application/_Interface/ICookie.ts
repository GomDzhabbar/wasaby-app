/// <amd-module name="Application/_Interface/ICookie" />
export interface ICookieOptions {
    domain: string
    expires: number | Date
    path: string
    secure: string
}

export interface ICookie {
    /**
     * Получение значение из cookie
     * @param key {string}
     */
    get(key: string): string

    /**
     * Устанавливаем cookie
     * @param key {string}
     * @param value {string}
     * @param options {Partial<ICookieOptions>}
     * @throws {Error} ошибка установки значения
     */
    set(key: string, value: string, options ?: Partial<ICookieOptions>): boolean

    /**
     * Удаляем cookie
     * @param key {string}
     * @throws {Error} ошибка очистки значения
     */
    remove(key: string): void;
}
