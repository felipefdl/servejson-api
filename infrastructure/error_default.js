/*jslint node:true*/
/*globals LOG, INFRA, SERVICES, CONFIG, HELPERS*/
'use strict';

module.exports = function (err, res, code) {
    if (err) {
        if (!process.env.PROD) {
            console.error(err);
        }

        // LOG.err(err); //TODO: Ativar log

        if (res) {
            res.send(INFRA.rd.error(code || 3003));
        }

        return true;
    }

    return false;
};
