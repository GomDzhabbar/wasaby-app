/// <amd-module name="Application/Initializer" />
import Config from "Application/_Config/Config";
import StateReceiver from "Application/_Env/Browser/StateReceiver";
import { IStateReceiver } from "Application/_Interface/IStateReceiver";
import { IEnvFactory } from "Application/_Interface/IEnv";
import Request from "Application/_Request/Request";
import { HashMap } from "Application/_Type";
import EnvBrowser from 'Application/_Env/Browser/Env';
import { ISerializableState } from './_Interface/ISerializableState';

export default function init(
    configData?: HashMap<string>,
    envFactory: IEnvFactory = EnvBrowser,
    stateReceiver: IStateReceiver = new StateReceiver(),
): Request {
    const config = new Config(configData);
    const request = new Request(envFactory.create(config), config);
    request.setStateReceiver(stateReceiver);
    request.getStateReceiver().register('appConfig', config);
    Request.setCurrent(request);
    return request;
}

export function registerComponent(uid: string, component: ISerializableState) {
    Request.getCurrent().getStateReceiver().register(uid, component);
}
