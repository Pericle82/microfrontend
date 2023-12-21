import express, { Router } from "express";
import shortCircuitRouter from "./shortCircuitRouter";
import addLogger from "../utils/addLogger";
import { PassportStatic } from "passport";
import { Request, RequestHandler, Response } from 'express';
import { BaseClient } from 'openid-client';
import logger from "../config/logger";

export default (static_root_path: string, passport: PassportStatic, client: BaseClient): Router => {
    const router = express.Router();

    console.log(static_root_path);

    const ensureAuthenticated: RequestHandler = (req: Request, res: Response, next) => {
     
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }

    router.use('/login', passport.authenticate('oidc', {
        successRedirect: '/',
        failureRedirect: '/error',
        failureFlash: true,
        successFlash: true,
        scope: 'openid profile email',
        
    }))
        .use('/authorization-code/callback',
            passport.authenticate('oidc', { failureRedirect: '/error' }),
            (req, res) => {
                req.flash('info', 'Successfully authenticated');
                res.redirect('/');
            }
        )

        .get('/logout', (req: Request, res: Response, next) => {

            res.redirect(client.endSessionUrl())
        })
        // logout cb not working
        .get('/logout/callback', (req, res) => {
            req.session.destroy(error => {
                if (error) {
                    logger.error("error: ", error);
                }

            });

            res.redirect('/login');

        })

        // the router can use a middleware function
        .use('/api', ensureAuthenticated, shortCircuitRouter())
        .use('/test', ensureAuthenticated,shortCircuitRouter())

        .use('/', express.static('public'));

    return router;

}
