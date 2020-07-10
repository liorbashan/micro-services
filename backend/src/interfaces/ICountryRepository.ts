import { Country } from './../entity/Country';
export interface ICountryRepository {
    getCountriesByContinentCode(continentCode: string): Promise<Country[]>;
}
