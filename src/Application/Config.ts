/// <amd-module name="Application/Config" />
import Request from "Application/Request";

export { default as Config } from 'Application/_Config/Config'

export function get(key: string) {
    return Request.getCurrent().getConfig().get(key);
}
