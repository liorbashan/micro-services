import { Continent } from './../entity/Continent';
export interface IContinentRepository {
    getContinents(): Promise<Continent[]>;
}
