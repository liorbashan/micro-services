import { JsonController, Get, Param } from 'routing-controllers';
import { Country } from './../entity/Country';
import { CountryRepository } from './../repositories/CountryRepository';

@JsonController('/country')
export class CountryController {
    public _repo: CountryRepository;
    constructor() {
        this._repo = new CountryRepository();
    }

    @Get('/:code')
    public async getCountriesByContinentCode(@Param('code') code: string): Promise<Country[]> {
        const result: Country[] = await this._repo.getContinentCountries(code);
        return result;
    }
}
