import { GraphqlService } from './../services/GraphqlService';
import { CacheService } from './../services/CacheService';
import { IContinentRepository } from './../interfaces/IContinentRepository';
import { IGraphqlService } from './../interfaces/IGraphqlService';
import { ICacheService } from './../interfaces/ICacheService';
import { Continent } from '../entity/Continent';
import Container, { Service } from 'typedi';

@Service()
export class ContinentRepository implements IContinentRepository {
    private readonly cacheKey = 'continent-list';
    private _cacheService: ICacheService = Container.get(CacheService);
    private _graphqlService: IGraphqlService = Container.get(GraphqlService);

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
