import { Continent } from '../entity/Continent';

export interface IContinentService {
    getContinents(): Promise<Continent[]>;
}
