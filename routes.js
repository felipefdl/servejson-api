/*jslint node:true, unparam:true*/
/*globals INFRA*/
'use strict';

var ctrl = require('./controllers/');

function routes(server) {
    server.options('*', INFRA.allow_header.all);

    server.get('*', INFRA.subdomain);
    server.post('*', INFRA.subdomain);
    server.put('*', INFRA.subdomain);
    server.delete('*', INFRA.subdomain);

    server.get('/', function (req, res) {
        res.send(INFRA.rd.success());
    });

    server.get('/docs/errors', ctrl.system.errors_list);

    server.post('/route/create', ctrl.routes.create_new_route);
    server.get('/route/get_all/:skip?/:limit?', ctrl.routes.get_all);
}

module.exports = routes;
