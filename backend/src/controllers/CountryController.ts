import { CountryService } from './../services/CountryService';
import { ICountryService } from './../interfaces/ICountryService';
import { JsonController, Get, Param } from 'routing-controllers';
import { Country } from './../entity/Country';
import { CountryRepository } from './../repositories/CountryRepository';
import Container from 'typedi';

@JsonController('/country')
export class CountryController {
    private _service: ICountryService = Container.get(CountryService);

    @Get('/:code')
    public async getCountriesByContinentCode(@Param('code') code: string): Promise<Country[]> {
        const result: Country[] = await this._service.getCountriesByContinentCode(code);
        return result;
    }
}
