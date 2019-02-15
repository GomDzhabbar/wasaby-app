/// <amd-module name="Application/_Interface/ICookie" />
export interface ICookieOptions {
    domain: string
    expires: number | Date
    path: string
    secure: string
}

export interface ICookie {
    get(key: string): string

    set(key: string, value: string, options ?: Partial<ICookieOptions>): boolean

    remove(key: string): void;
}
