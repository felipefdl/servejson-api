/*jslint node: true*/
/*globals INFRA, DB, CONFIG*/
'use strict';

module.exports = function (req, res, next) {
    var subdomain, url, query;

    subdomain = req.headers.host.split('.')[0];
    url = req.url;

    if (CONFIG.reserved_subdomain.indexOf(subdomain) !== -1) {
        next();
        return;
    }

    query = {
        'subdomain': subdomain,
        'route'    : INFRA.remove_slash(url),
        'type'     : req.method.toLowerCase()
    };

    DB.collection('route').findOne(query, function (err, result) {
        if (INFRA.err(err, res)) {
            return;
        }

        if (!result) {
            next();
            return;
        }

        res.send(result.json);
    });
};
