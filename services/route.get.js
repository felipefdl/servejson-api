/*jslint node:true*/
/*globals DB, INFRA*/
'use strict';

function get_all(req, res) {
    var limit, skip, sort, filter;

    limit = Number(req.params.limit) || 10;
    if (limit > 30) {
        limit = 30;
    }

    skip = Number(req.params.skip) || 0;

    sort = {
        "created_at": -1
    };

    filter = {
        '_id': 0,
        'json': 0
    };

    DB.collection('route').find({}, filter).sort(sort).skip(skip).limit(limit).toArray(function (err, routes) {
        if (INFRA.err(err, res)) {
            return;
        }

        res.send(INFRA.rd.success(routes));
    });
}

exports.get_all = get_all;
