/// <amd-module name="Application/Config" />
import Request from "Application/_Request/Request";

export function get(key: string) {
    return Request.getCurrent().getConfig().get(key);
}
