/// <amd-module name="Application/Env" />
import Request from "Application/_Request/Request";
export { default as EnvBrowser } from "Application/_Env/Browser/Env";
export { LogLevel } from "Application/_Env/Console";

export function getLocation() {
    return Request.getCurrent().location;
}

// export function getCookie() {
//     return Request.getCurrent().cookie;
// }

export function getLogger() {
    return Request.getCurrent().console;
}

export function getStateReceiver() {
    return Request.getCurrent().getStateReceiver();
}

export function getStorage(type) {
    return Request.getCurrent().getStorage(type);
}

// export detection;
// export compatibility
