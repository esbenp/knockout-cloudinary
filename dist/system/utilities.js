System.register([], function (_export) {
  'use strict';

  _export('isUndefined', isUndefined);

  _export('isString', isString);

  function isUndefined(input) {
    return typeof input === 'undefined';
  }

  function isString(input) {
    return typeof input === 'string';
  }

  return {
    setters: [],
    execute: function () {}
  };
});