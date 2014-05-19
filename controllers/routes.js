/*jslint node:true*/
/*globals SERVICES, INFRA*/
'use strict';

function create_new_route(req, res) {
    SERVICES.route.create(req.body, function (err) {
        if (err) {
            res.send(INFRA.rd.error(err));
        } else {
            res.send(INFRA.rd.success());
        }
    });
}

function get_all(req, res) {
    SERVICES.route.get.get_all(req.params, function (err, result) {
        if (err) {
            res.send(INFRA.rd.error(err));
        } else {
            res.send(INFRA.rd.success(result));
        }
    });
}

exports.create_new_route = create_new_route;
exports.get_all          = get_all;
