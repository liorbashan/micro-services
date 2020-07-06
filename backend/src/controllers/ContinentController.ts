import { ContinentRepository } from './../repositories/ContinentRepository';
import { Continent } from './../entity/Continent';
import { JsonController, Get } from 'routing-controllers';

@JsonController('/continent')
export class ContinentController {
    public _repo: ContinentRepository;
    constructor() {
        this._repo = new ContinentRepository();
    }

    @Get('/')
    public async getAllContinents(): Promise<Continent[]> {
        const result: Continent[] = await this._repo.getContinents();
        return result;
    }
}
