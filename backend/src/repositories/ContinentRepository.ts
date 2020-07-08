import { GraphqlService } from './../services/GraphqlService';
import { IGraphqlService } from './../interfaces/IGraphqlService';
import { CacheService } from './../services/CacheService';
import { ICacheService } from './../interfaces/ICacheService';
import { Container } from 'typedi';
import { Continent } from '../entity/Continent';

export class ContinentRepository {
    private readonly cacheKey = 'continent-list';
    constructor(protected _cacheService: ICacheService, protected _graphqlService: IGraphqlService) {
        this._cacheService = Container.get(CacheService);
        this._graphqlService = Container.get(GraphqlService);
    }

    public async getContinents(): Promise<Continent[]> {
        let result: Continent[] = [];
        const cacheEnabled: boolean = this._cacheService.isConnected();
        if (cacheEnabled) {
            result = await this._cacheService.getValue(this.cacheKey).catch((error) => {
                console.log(error);
            });
        }
        if (!result || result.length === 0) {
            result = [];
            result = await this._graphqlService.getAllContinents();
            if (cacheEnabled) {
                this.cacheContinentList(result);
            }
        }

        return result;
    }

    private async cacheContinentList(data: Continent[]): Promise<boolean> {
        const payload: string = JSON.stringify(data);
        await this._cacheService.setValue(this.cacheKey, payload, 3600).catch((error) => {
            console.log(error);
            return false;
        });
        return true;
    }
}
