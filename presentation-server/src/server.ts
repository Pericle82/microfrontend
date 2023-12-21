import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import serve_config from './config/serve_config';
import rootRouter from './routers/rootRouter';
import logger from './config/logger';
import session from 'express-session';
import { BaseClient, Issuer } from 'openid-client';
import oidc, { oidc_config } from './config/oidc';
import flash from 'connect-flash';
import { join, dirname } from 'path';

const app = express();
app.use(cookieParser())

 app.use(
    helmet({
            contentSecurityPolicy: false,
            crossOriginResourcePolicy: false
        }
    )
); 
//app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(serve_config.session_config))

const { port, host } = serve_config;

const client = Issuer.discover(oidc_config.issuer_url).then(issuer => {
    logger.info('OIDC issuer discovered');
    return new issuer.Client(oidc_config.client)
});

client.then((client: BaseClient) => {
    logger.info('OIDC client created');

    app.use(flash());
    const passport = oidc(client);
    app.use(passport.initialize());
    app.use(passport.session());

    const filePath = __filename;
    const dirPath = __dirname;

    console.log(dirPath);

    app.use('/', rootRouter(join(dirname(filePath), '../public'), passport, client));

}).catch(err => {
    logger.error('OIDC client creation failed');
    logger.error(err);
    process.exit(1);
}
);

app.listen(port, host, () => {
    const message = `Server running at http://${host}:${port}/`.toString();
    return logger.info(message);
});
