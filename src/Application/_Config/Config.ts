/// <amd-module name="Application/_Config/Config" />
import { ISerializableState } from "Application/_Interface/ISerializableState";
import { HashMap, Native } from 'Application/_Type';

export default class Config implements ISerializableState {
    constructor(private data: HashMap<Native> = {}, private __uid: string = 'appConfig') {
    }

    get(key: string): Native {
        return this.data[key];
    }

    getState(): HashMap<Native> {
        return this.data;
    }

    setState(data: HashMap<Native>) {
        if (!data) {
            return;
        }
        this.data = data;
    }

    getUID() {
        return this.__uid;
    }
}
