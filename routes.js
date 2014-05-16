/*jslint node:true, unparam:true*/
/*globals INFRA, SERVICES*/
'use strict';

function routes(server) {
    server.options('*', INFRA.allow_header.all);

    server.get('/', function (req, res) {
        res.send(INFRA.rd.success());
    });

    server.get('/docs/errors', INFRA.allow_header.get, SERVICES.docs.errors.list);

    // server.post('/account/create', SERVICES.account.create);

    server.post('/route/create', INFRA.allow_header.post, SERVICES.route.create);
    server.get('/route/get_all/:skip?/:limit?', INFRA.allow_header.get, SERVICES.route.get.get_all);
}

module.exports = routes;
