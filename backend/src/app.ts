import { CacheService } from './services/CacheService';
import { Container } from 'typedi';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';

(async () => {
    const baseDir = __dirname;
    const app = createExpressServer({
        controllers: [baseDir + '//controllers/*{.js,.ts}'],
        // middlewares: [baseDir + "/modules/**/middlewares/*{.js,.ts}"]
    });
    const port: number = Number(process.env.PORT) || 3000;
    Container.get(CacheService);
    // const cacheService: ICacheService = new CacheService();
    // cacheService.setValue('lior', 1, 36000);

    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
})();
