import { Country } from './../entity/Country';
import { CountryRepository } from './../repositories/CountryRepository';
import { ICountryRepository } from './../interfaces/ICountryRepository';
import { ICountryService } from './../interfaces/ICountryService';
import Container from 'typedi';

export class CountryService implements ICountryService {
    private _repo: ICountryRepository = Container.get(CountryRepository);

    public async getCountriesByContinentCode(code: string): Promise<Country[]> {
        return await this._repo.getCountriesByContinentCode(code);
    }
}
