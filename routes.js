/*jslint node:true, unparam:true*/
/*globals INFRA*/
'use strict';

var ctrl = require('./controllers/');

function routes(server) {
    server.options('*', INFRA.allow_header.all);

    server.get('*', INFRA.subdomain);
    server.post('*', INFRA.subdomain);
    server.put('*', INFRA.subdomain);
    server.del('*', INFRA.subdomain);

    server.get('/', function (req, res) {
        res.send(INFRA.rd.success());
    });

    server.get('/docs/errors', INFRA.allow_header.get, ctrl.system.errors_list);

    server.post('/route/create', INFRA.allow_header.post, ctrl.routes.create_new_route);
    server.get('/route/get_all/:skip?/:limit?', INFRA.allow_header.get, ctrl.routes.get_all);
}

module.exports = routes;
