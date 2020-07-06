import { CacheService } from './services/CacheService';
import { Container } from 'typedi';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';

(async () => {
    const baseDir = __dirname;
    const app = createExpressServer({
        cors: true,
        controllers: [baseDir + '//controllers/*{.js,.ts}'],
        // middlewares: [baseDir + "/modules/**/middlewares/*{.js,.ts}"]
    });
    const port: number = Number(process.env.PORT) || 3000;
    Container.get(CacheService);

    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
})();
