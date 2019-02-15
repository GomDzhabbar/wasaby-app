/// <amd-module name="Application/Initializer" />
import Config from "Application/_Config/Config";
import EnvBrowser from 'Application/_Env/Browser/Env';
import StateReceiver from "Application/_Env/Browser/StateReceiver";
import { IEnvFactory } from "Application/_Interface/IEnv";
import { IStateReceiver } from "Application/_Interface/IStateReceiver";
import Request from "Application/_Request/Request";
import { HashMap } from "Application/_Type";
import { ISerializableState } from './_Interface/ISerializableState';

export default function init(
    defaultConfigData?: HashMap<string>,
    envFactory: IEnvFactory = EnvBrowser,
    stateReceiver: IStateReceiver = new StateReceiver(),
): Request {
    const config = new Config(defaultConfigData);
    stateReceiver.register(config.getUID(), config);
    const request = new Request(envFactory.create(config), config);
    request.setStateReceiver(stateReceiver);
    Request.setCurrent(request);
    return request;
}

export function registerComponent(uid: string, component: ISerializableState) {
    Request.getCurrent().getStateReceiver().register(uid, component);
}
