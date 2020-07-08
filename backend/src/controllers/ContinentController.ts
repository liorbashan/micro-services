import { GraphqlService } from './../services/GraphqlService';
import { CacheService } from './../services/CacheService';
import { ContinentRepository } from './../repositories/ContinentRepository';
import { Continent } from './../entity/Continent';
import { JsonController, Get } from 'routing-controllers';
import { Container } from 'typedi';

@JsonController('/continent')
export class ContinentController {
    public _repo: ContinentRepository;
    constructor() {
        this._repo = new ContinentRepository(Container.get(CacheService), Container.get(GraphqlService));
    }

    @Get('/')
    public async getAllContinents(): Promise<Continent[]> {
        const result: Continent[] = await this._repo.getContinents();
        return result;
    }
}
