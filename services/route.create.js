/*jslint node:true*/
/*globals DB, INFRA, CONFIG*/
'use strict';

var v = require('validator');

function validation(routeobj, cb) {
    var errors = [];

    // Null errors
    if (!routeobj.json) {
        errors.push(1008);
        cb(errors);
        return;
    }

    if (!routeobj.route) {
        errors.push(1009);
        cb(errors);
        return;
    }

    if (!routeobj.subdomain) {
        errors.push(1010);
        cb(errors);
        return;
    }

    // Type allowed
    if (CONFIG.types_allowed.indexOf(routeobj.type) === -1) {
        errors.push(1011);
        cb(errors);
        return;
    }

    // Sub-domain reserved
    if (CONFIG.reserved_subdomain.indexOf(routeobj.subdomain) !== -1) {
        errors.push(1013);
        cb(errors);
        return;
    }

    // JSON error
    try {
        JSON.parse(routeobj.json);
    } catch (e) {
        errors.push(1008);
        cb(errors);
        return;
    }

    // Routes error
    if (routeobj.route.length === 0) {
        errors.push(1009);
        cb(errors);
        return;
    }

    // Database error
    DB.collection('subdomain').findOne({'subdomain': routeobj.subdomain}, function (err, data) {
        if (err) {
            errors.push(3003);
            cb(errors);
            return;
        }

        if (!data) {
            errors.push(1010);
            cb(errors);
            return;
        }

        var query = {
            'route': routeobj.route,
            'subdomain': routeobj.subdomain,
            'type': routeobj.type
        };

        DB.collection('route').findOne(query, function (err, data) {
            if (err) {
                errors.push(3003);
                cb(errors);
                return;
            }

            if (data) {
                errors.push(1012);
            }

            cb(errors);
        });
    });
}

/* routeobj: Input object (example)
    {
        "type"     : String,
        "route"    : String,
        "subdomain": String,
        "json"     : JSON.stringify
    }
*/
function create(routeobj, callback) {
    routeobj.route = INFRA.remove_slash(routeobj.route);

    validation(routeobj, function (errors) {
        if (errors.length > 0) {
            callback(errors);
            return;
        }

        var route = {
            'subdomain': routeobj.subdomain,
            'type' : routeobj.type,
            'route': routeobj.route,
            'json' : routeobj.json,
            'created_at': new Date()
        };

        DB.collection('route').insert(route, function (err) {
            if (err) {
                callback([3003]);
                return;
            }

            callback(null, true);
        });
    });
}

module.exports = create;
