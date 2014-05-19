/*jslint node:true*/
/*globals DB, INFRA, CONFIG*/
'use strict';

var v = require('validator');

function validation(body, res, cb) {
    var errors = [];

    // Null errors
    if (!body.json) {
        errors.push(1008);
        cb(errors);
        return;
    }

    if (!body.route) {
        errors.push(1009);
        cb(errors);
        return;
    }

    if (!body.subdomain) {
        errors.push(1010);
        cb(errors);
        return;
    }

    // Type allowed
    if (CONFIG.types_allowed.indexOf(body.type) === -1) {
        errors.push(1011);
        cb(errors);
        return;
    }

    // Sub-domain reserved
    if (CONFIG.reserved_subdomain.indexOf(body.subdomain) !== -1) {
        errors.push(1013);
        cb(errors);
        return;
    }

    // JSON error
    try {
        JSON.parse(body.json);
    } catch (e) {
        errors.push(1008);
        cb(errors);
        return;
    }

    // Routes error
    if (body.route.length === 0) {
        errors.push(1009);
        cb(errors);
        return;
    }

    // Database error
    DB.collection('subdomain').findOne({'subdomain': body.subdomain}, function (err, data) {
        if (INFRA.err(err, res)) {
            return;
        }

        if (!data) {
            errors.push(1010);
            cb(errors);
            return;
        }

        var query = {
            'route': body.route,
            'subdomain': body.subdomain,
            'type': body.type
        };

        DB.collection('route').findOne(query, function (err, data) {
            if (INFRA.err(err, res)) {
                return;
            }

            if (data) {
                errors.push(1012);
            }

            cb(errors);
        });
    });
}

function create(req, res) {
    var body = req.body;
    body.route = INFRA.remove_slash(body.route);

    validation(body, res, function (errors) {
        if (errors.length > 0) {
            res.send(INFRA.rd.error(errors));
            return;
        }

        var route = {
            'subdomain': body.subdomain,
            'type' : body.type,
            'route': body.route,
            'json' : body.json,
            'created_at': new Date()
        };

        DB.collection('route').insert(route, function (err) {
            if (INFRA.err(err, res)) {
                return;
            }

            res.send(INFRA.rd.success());
        });
    });
}

module.exports = create;
