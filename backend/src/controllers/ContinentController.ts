import { ContinentService } from './../services/ContinentService';
import { IContinentService } from './../interfaces/IContinentService';
import { Container } from 'typedi';
import { Continent } from './../entity/Continent';
import { JsonController, Get } from 'routing-controllers';

@JsonController('/continent')
export class ContinentController {
    private _service: IContinentService = Container.get(ContinentService);

    @Get('/')
    public async getAllContinents(): Promise<Continent[]> {
        const result: Continent[] = await this._service.getContinents();
        return result;
    }
}
