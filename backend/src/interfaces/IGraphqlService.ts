import { Country } from './../entity/Country';
import { Continent } from './../entity/Continent';
export interface IGraphqlService {
    getAllContinents(): Promise<Continent[]>;
    getAllContinentCountries(continentCode: string): Promise<Country[]>;
}
