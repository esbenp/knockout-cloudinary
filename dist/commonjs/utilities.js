'use strict';

exports.__esModule = true;
exports.isUndefined = isUndefined;
exports.isString = isString;

function isUndefined(input) {
  return typeof input === 'undefined';
}

function isString(input) {
  return typeof input === 'string';
}