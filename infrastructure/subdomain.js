/*jslint node: true*/
/*globals INFRA, SERVICES, CONFIG*/
'use strict';

module.exports = function (req, res, next) {
    var subdomain, route;

    subdomain = req.headers.host.split('.')[0];

    if (CONFIG.reserved_subdomain.indexOf(subdomain) !== -1) {
        next();
        return;
    }

    route = {
        'subdomain' : subdomain,
        'route'     : req.url,
        'type'      : req.method
    };

    SERVICES.route.get.get_route(route, function (err, result) {
        if (err) {
            res.send(INFRA.rd.error([3003]));
            return;
        }

        if (!result) {
            next();
            return;
        }

        res.send(result);
    });
};
