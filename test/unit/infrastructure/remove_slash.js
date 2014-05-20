/*jslint node:true*/
/*globals suite, test, setup*/
'use strict';

var assert = require('assert');

suite('Remove slash', function () {
    var remove_slash;
    setup(function () {
        remove_slash = require('../../../infrastructure/remove_slash.js');
    });

    test('first character', function () {
        var string1 = remove_slash('/teste');
        assert.equal('teste', string1);
    });

    test('last character', function () {
        var string1 = remove_slash('teste/');
        assert.equal('teste', string1);
    });

    test('first and last character', function () {
        var string1 = remove_slash('/teste/');
        assert.equal('teste', string1);
    });

    test('with one space', function () {
        var string1 = remove_slash('/tes te/');
        assert.equal('teste', string1);
    });

    test('with two space', function () {
        var string1 = remove_slash('/tes  te/');
        assert.equal('teste', string1);
    });

    test('null string', function () {
        var string1 = remove_slash('');
        assert.equal('', string1);
    });
});
