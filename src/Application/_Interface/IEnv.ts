/// <amd-module name="Application/_Interface/IEnv" />
import Config from 'Application/_Config/Config';
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie } from 'Application/_Interface/ICookie';
import { ILocation } from 'Application/_Interface/ILocation';
import { IRequest } from 'Application/_Interface/IRequest';
import { IStoreMap } from 'Application/_Interface/IStore';

export interface IEnv {
    console: IConsole
    cookie: ICookie
    location: ILocation
    storages: IStoreMap
    getGlobal: () => { appRequest: IRequest | undefined }
}

export interface IEnvFactory {
    create(config: Config): IEnv
}
