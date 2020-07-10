import { ContinentRepository } from './../repositories/ContinentRepository';
import { IContinentRepository } from './../interfaces/IContinentRepository';
import { IContinentService } from './../interfaces/IContinentService';
import { Continent } from '../entity/Continent';
import Container from 'typedi';

export class ContinentService implements IContinentService {
    private _repo: IContinentRepository = Container.get(ContinentRepository);

    public async getContinents(): Promise<Continent[]> {
        return await this._repo.getContinents();
    }
}
