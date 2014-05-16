/*jslint node:true*/
'use strict';

module.exports = function remove(text) {
    text = text || '';

    if (text.indexOf('/') === 0) {
        text = text.substring(1);
    }

    if (text.slice(-1) === '/') {
        text = text.slice(0, -1);
    }

    text = text.replace(/\s+/g, '');

    return String(text);
};
