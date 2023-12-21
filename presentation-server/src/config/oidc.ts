import { BaseClient, ClientAuthMethod, Strategy, TokenSet, UserinfoResponse } from "openid-client";
import passport, { PassportStatic } from "passport";

type OIDCconfig = {
    issuer_url: string;
    client: {
        client_id: string;
        client_secret: string;
        redirect_uris: string[];
        response_types: string[];
        post_logout_redirect_uris: string[];
        token_endpoint_auth_method: ClientAuthMethod;
    }
};

export const oidc_config: OIDCconfig = {
    issuer_url: 'http://localhost/realms/oidc_test',
    client: {
        client_id: 'express_presentation',
        client_secret: 'WwuRwibr30E5T2SNrrJYZw00Uq63NM77',
        redirect_uris: ['http://localhost:3000/authorization-code/callback'],
        response_types: ['code'],
        post_logout_redirect_uris: ['http://localhost:3000/logout/callback'],
        token_endpoint_auth_method: 'client_secret_post',
    }
};


type DoneFunction = (err: any, id?: unknown) => void;

export default (client: BaseClient): PassportStatic => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user: any, done) => {
        done(null, user);
    });

    passport.use(
        'oidc',
        new Strategy({ client }, (tokenSet: TokenSet, userinfo: UserinfoResponse, done: DoneFunction) => {
            //console.log("tokenSet", tokenSet);
            //console.log("userinfo", userinfo);
            return done(null, tokenSet.claims());
        })
    );

    return passport;
}
