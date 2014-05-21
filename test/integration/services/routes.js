/*jslint node:true, todo:true*/
/*globals DB, after, suite, before, test, CONFIG, SERVICES*/
'use strict';

var assert = require('assert');

suite('Routes', function () {
    before(function (done) {
        require('../../../bootstrap/')(done);
    });

    after(function (done) {
        DB.collection('subdomain').remove({}, function () {
            DB.collection('route').remove({}, function () { done(); });
        });
    });

    suite('Get', function () {
        suite('Get all', function () {
            before(function (done) {
                var objs = [
                    {
                        "subdomain"  : "test",
                        "type"       : "get",
                        "route"      : "aa",
                        "json"       : "{\n    \"aa\": \"0\"\n}",
                        "created_at" : new Date()
                    },
                    {
                        "subdomain"  : "test",
                        "type"       : "post",
                        "route"      : "bb",
                        "json"       : "{\n    \"aaa\": \"1\"\n}",
                        "created_at" : new Date()
                    },
                    {
                        "subdomain"  : "test",
                        "type"       : "delete",
                        "route"      : "xx",
                        "json"       : "{\n    \"aaa\": \"2\"\n}",
                        "created_at" : new Date()
                    }
                ];
                DB.collection('route').insert(objs, function () { done(); });
            });

            test('No params', function (done) {
                var params = {};
                SERVICES.route.get.get_all(params, function (err, result) {
                    assert.ok(!err);
                    assert.ok(result.length > 3);
                    done();
                });
            });

            test('With limit', function (done) {
                var params = {"limit": 1};
                SERVICES.route.get.get_all(params, function (err, result) {
                    assert.ok(!err);
                    assert.equal(1, result.length);
                    done();
                });
            });

            test('With skip', function (done) {
                var params = {"skip": 1};
                SERVICES.route.get.get_all(params, function (err, result) {
                    assert.ok(!err);
                    assert.ok(result.length > 2);
                    done();
                });
            });

            test('With limit and skip', function (done) {
                var params = {"limit": 1, "skip": 1};
                SERVICES.route.get.get_all(params, function (err, result) {
                    assert.ok(!err);
                    assert.equal(1, result.length);
                    done();
                });
            });
        });
    });

    suite('Create', function () {
        before(function (done) {
            DB.collection('subdomain').insert({"subdomain": "test"}, function () {
                done();
            });
        });

        suite('Success', function () {
            test('Save with success', function (done) {
                var objinput = {
                    "type"      : "get",
                    "route"     : "/test",
                    "subdomain" : "test",
                    "json"      : JSON.stringify({"test": 123})
                };

                SERVICES.route.create(objinput, function (err, result) {
                    assert.ok(!err);
                    assert.ok(result);
                    done();
                });
            });
        });

        suite('Error', function () {
            test('Type invalid', function (done) {
                var objinput = {
                    "type"      : "obter",
                    "route"     : "/test",
                    "subdomain" : "test",
                    "json"      : JSON.stringify({"test": 123})
                };

                SERVICES.route.create(objinput, function (err) {
                    assert.equal(err[0], 1011);
                    done();
                });
            });

            test('Route already exists', function (done) {
                var objinput = {
                    "type"      : "get",
                    "route"     : "/test",
                    "subdomain" : "test",
                    "json"      : JSON.stringify({"test": 123})
                };

                SERVICES.route.create(objinput, function (err) {
                    assert.equal(err[0], 1012);
                    done();
                });
            });

            test('Sub-domain invalid', function (done) {
                var objinput = {
                    "type"      : "get",
                    "route"     : "/teste",
                    "subdomain" : "xxx",
                    "json"      : JSON.stringify({"test": 123})
                };

                SERVICES.route.create(objinput, function (err) {
                    assert.equal(err[0], 1010);
                    done();
                });
            });

            test('JSON invalid', function (done) {
                var objinput = {
                    "type"      : "get",
                    "route"     : "/teste",
                    "subdomain" : "test",
                    "json"      : "{'test: 123'}"
                };

                SERVICES.route.create(objinput, function (err) {
                    assert.equal(err[0], 1008);
                    done();
                });
            });
        });
    });

});
