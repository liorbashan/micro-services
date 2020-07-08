import { JsonController, Get, Param } from 'routing-controllers';
import { Country } from './../entity/Country';
import { CountryRepository } from './../repositories/CountryRepository';
import { Container } from 'typedi';
import { GraphqlService } from './../services/GraphqlService';
import { CacheService } from './../services/CacheService';

@JsonController('/country')
export class CountryController {
    public _repo: CountryRepository;
    constructor() {
        this._repo = new CountryRepository(Container.get(CacheService), Container.get(GraphqlService));
    }

    @Get('/:code')
    public async getCountriesByContinentCode(@Param('code') code: string): Promise<Country[]> {
        const result: Country[] = await this._repo.getContinentCountries(code);
        return result;
    }
}
