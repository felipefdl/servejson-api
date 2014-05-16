/*jslint node:true, unparam:true, nomen:true, stupid:true*/
'use strict';

var yaml       = require('js-yaml');
var fs         = require('fs');
var path       = require('path');
var errorslist = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '../docs/errors/en.yml'), 'utf8'));

function list(req, res) {
    res.send(errorslist);
}

exports.list = list;
