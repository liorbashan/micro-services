import { ICountryRepository } from './../interfaces/ICountryRepository';
import { Country } from './../entity/Country';
import { GraphqlService } from './../services/GraphqlService';
import { CacheService } from './../services/CacheService';
import { Container, Service } from 'typedi';
import { IGraphqlService } from './../interfaces/IGraphqlService';
import { ICacheService } from './../interfaces/ICacheService';

@Service()
export class CountryRepository implements ICountryRepository {
    private _cacheService: ICacheService = Container.get(CacheService);
    private _graphqlService: IGraphqlService = Container.get(GraphqlService);

    public async getCountriesByContinentCode(continentCode: string): Promise<Country[]> {
        let result: Country[] = [];
        const cacheEnabled: boolean = this._cacheService.isConnected();
        if (cacheEnabled) {
            result = await this._cacheService.getValue(continentCode).catch((error) => {
                console.log(error);
            });
        }
        if (!result || result.length === 0) {
            result = [];
            result = await this._graphqlService.getAllContinentCountries(continentCode);
            if (cacheEnabled) {
                this.cacheCountriesList(continentCode, result);
            }
        }

        return result;
    }

    private async cacheCountriesList(key: string, data: Country[]): Promise<boolean> {
        const payload: string = JSON.stringify(data);
        await this._cacheService.setValue(key, payload, 3600).catch((error) => {
            console.log(error);
            return false;
        });
        return true;
    }
}
