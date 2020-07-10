import { Country } from './../entity/Country';

export interface ICountryService {
    getCountriesByContinentCode(code: string): Promise<Country[]>;
}
