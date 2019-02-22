/// <amd-module name="Application/_Interface/IConfig" />
import { Native } from 'Application/_Type';

export interface IConfig {
    get(key: string): Native
}
