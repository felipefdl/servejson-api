/*jslint node:true*/
/*globals DB, INFRA*/
'use strict';

/* params: Input object (example)
    {
        "limit     : Number,
        "skip"     : Number
    }
*/
function get_all(params, callback) {
    var limit, skip, sort, filter;

    limit = Number(params.limit) || 10;
    if (limit > 30) {
        limit = 30;
    }

    skip = Number(params.skip) || 0;

    sort = {
        "created_at": -1
    };

    filter = {
        '_id': 0,
        'json': 0
    };

    DB.collection('route').find({}, filter).sort(sort).skip(skip).limit(limit).toArray(function (err, routes) {
        if (err) {
            callback([3003]);
            return;
        }

        callback(null, routes);
    });
}

/* params: Input object (example)
    {
        "subdomain" : String,
        "route"     : String,
        "type"      : String
    }
*/
function get_route(route, callback) {
    var query = {
        'subdomain' : route.subdomain,
        'route'     : INFRA.remove_slash(route.url),
        'type'      : route.type.toLowerCase()
    };

    DB.collection('route').findOne(query, function (err, result) {
        if (err) {
            callback([3003]);
            return;
        }

        if (!result) {
            callback();
            return;
        }

        callback(result.json);
    });
}

exports.get_all   = get_all;
exports.get_route = get_route;
