import { Router } from "express";

const expressWinston = require('express-winston');
const { format, transports } = require('winston');

export default (router: Router) => {
    // express-winston logger makes sense BEFORE the router
    router.use(expressWinston.logger({
        transports: [
            new transports.Console({
                colorize: true,
                format: format.combine(
                    format.colorize(),
                    format.simple()
                ),
                json: true
            })
        ]
    }));
}